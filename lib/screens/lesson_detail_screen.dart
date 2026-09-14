import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import '../theme/app_theme.dart';
import '../models/lesson_model.dart';

class LessonDetailScreen extends StatefulWidget {
  final Lesson lesson;

  const LessonDetailScreen({super.key, required this.lesson});

  @override
  State<LessonDetailScreen> createState() => _LessonDetailScreenState();
}

class _LessonDetailScreenState extends State<LessonDetailScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final FlutterTts _tts = FlutterTts();
  final stt.SpeechToText _speech = stt.SpeechToText();
  
  // Skill completion states
  bool _readingDone = false;
  bool _listeningDone = false;
  bool _writingDone = false;
  bool _speakingDone = false;

  // Reading quiz
  int? _selectedAnswer;
  bool? _answerChecked;

  // Listening
  String _listenAnswer = '';

  // Writing
  final TextEditingController _writingController = TextEditingController();
  String _writingFeedback = '';

  // Speaking
  bool _isRecording = false;
  String _spokenText = '';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _initTts();
    _initSpeech();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _tts.stop();
    _writingController.dispose();
    super.dispose();
  }

  Future<void> _initTts() async {
    await _tts.setLanguage('en-US');
    await _tts.setSpeechRate(0.9);
    await _tts.setVolume(1.0);
    await _tts.setPitch(1.0);
  }

  Future<void> _initSpeech() async {
    await _speech.initialize();
  }

  Future<void> _speak(String text) async {
    await _tts.speak(text);
  }

  Future<void> _speakSlow(String text) async {
    await _tts.setSpeechRate(0.5);
    await _tts.speak(text);
    await _tts.setSpeechRate(0.9);
  }

  void _checkReading() {
    setState(() {
      _answerChecked = true;
      if (_selectedAnswer == widget.lesson.reading['c']) {
        _readingDone = true;
      }
    });
    _showResult(_readingDone, 'Reading');
  }

  void _checkListening() {
    final correct = widget.lesson.listening.toLowerCase().trim();
    final answer = _listenAnswer.toLowerCase().trim();
    setState(() {
      _listeningDone = answer == correct || answer.contains(correct.substring(0, correct.length ~/ 2));
    });
    _showResult(_listeningDone, 'Listening');
  }

  void _checkWriting() {
    final text = _writingController.text.trim();
    setState(() {
      _writingDone = text.length > 10;
      _writingFeedback = _writingDone
          ? '✅ Yaxshi! Davom eting.'
          : '⚠️ Kamida 10 ta belgi yozing.';
    });
    _showResult(_writingDone, 'Writing');
  }

  void _startSpeaking() async {
    if (_isRecording) {
      final result = await _speech.stop();
      setState(() {
        _isRecording = false;
        _spokenText = result.recognizedWords;
        _speakingDone = _spokenText.length > 5;
      });
      _showResult(_speakingDone, 'Speaking');
    } else {
      await _speech.listen(
        onResult: (result) {
          setState(() {
            _spokenText = result.recognizedWords;
          });
        },
        localeId: 'en_US',
      );
      setState(() => _isRecording = true);
    }
  }

  void _showResult(bool success, String skill) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(success ? '✅ $skill tugallandi!' : '❌ Qaytadan urinib ko\'ring'),
        backgroundColor: success ? AppTheme.success : AppTheme.error,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }

  bool get _allSkillsDone => _readingDone && _listeningDone && _writingDone && _speakingDone;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // Header
            _buildHeader(),
            // Tab bar
            _buildTabBar(),
            // Tab content
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildReadingTab(),
                  _buildListeningTab(),
                  _buildWritingTab(),
                  _buildSpeakingTab(),
                ],
              ),
            ),
            // Complete button
            _buildCompleteButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.arrow_back_ios),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: _getLevelColor(widget.lesson.level).withOpacity(0.15),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  widget.lesson.level,
                  style: TextStyle(
                    color: _getLevelColor(widget.lesson.level),
                    fontWeight: FontWeight.w700,
                    fontSize: 11,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  widget.lesson.title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: AppTheme.card,
        borderRadius: BorderRadius.circular(12),
      ),
      child: TabBar(
        controller: _tabController,
        indicator: BoxDecoration(
          gradient: AppTheme.primaryGradient,
          borderRadius: BorderRadius.circular(10),
        ),
        indicatorSize: TabBarIndicatorSize.tab,
        dividerColor: Colors.transparent,
        labelColor: Colors.white,
        unselectedLabelColor: AppTheme.textSecondary,
        labelStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12),
        tabs: [
          Tab(icon: Text(_readingDone ? '✅📖' : '📖'), text: 'Reading'),
          Tab(icon: Text(_listeningDone ? '✅🎧' : '🎧'), text: 'Listening'),
          Tab(icon: Text(_writingDone ? '✅✍️' : '✍️'), text: 'Writing'),
          Tab(icon: Text(_speakingDone ? '✅🗣' : '🗣'), text: 'Speaking'),
        ],
      ),
    );
  }

  Widget _buildReadingTab() {
    final reading = widget.lesson.reading;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '📖 O\'qing va javob bering',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 12),
          // Reading text
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.card,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.primary.withOpacity(0.2)),
            ),
            child: Text(
              reading['t'].replaceAll('\\n', '\n'),
              style: const TextStyle(
                fontSize: 15,
                height: 1.6,
                color: AppTheme.text,
              ),
            ),
          ),
          const SizedBox(height: 16),
          // Question
          Text(
            reading['q'],
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),
          // Options
          ...List.generate(4, (i) {
            final isSelected = _selectedAnswer == i;
            final isCorrect = i == reading['c'];
            final showResult = _answerChecked == true;

            Color? bgColor;
            Color? borderColor;
            if (showResult) {
              if (isCorrect) {
                bgColor = AppTheme.success.withOpacity(0.15);
                borderColor = AppTheme.success;
              } else if (isSelected && !isCorrect) {
                bgColor = AppTheme.error.withOpacity(0.15);
                borderColor = AppTheme.error;
              }
            } else if (isSelected) {
              bgColor = AppTheme.primary.withOpacity(0.1);
              borderColor = AppTheme.primary;
            }

            return GestureDetector(
              onTap: _answerChecked == null ? () {
                setState(() => _selectedAnswer = i);
              } : null,
              child: Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: bgColor ?? AppTheme.card,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: borderColor ?? AppTheme.card,
                  ),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 28,
                      height: 28,
                      decoration: BoxDecoration(
                        color: isSelected
                            ? AppTheme.primary.withOpacity(0.2)
                            : Colors.white.withOpacity(0.05),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Center(
                        child: Text(
                          String.fromCharCode(65 + i),
                          style: TextStyle(
                            fontWeight: FontWeight.w700,
                            color: isSelected ? AppTheme.primary : AppTheme.textSecondary,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        reading['o'][i],
                        style: TextStyle(
                          color: showResult
                              ? (isCorrect ? AppTheme.success : (isSelected ? AppTheme.error : AppTheme.textSecondary))
                              : AppTheme.text,
                        ),
                      ),
                    ),
                    if (showResult && isCorrect)
                      const Icon(Icons.check_circle, color: AppTheme.success, size: 20),
                    if (showResult && isSelected && !isCorrect)
                      const Icon(Icons.cancel, color: AppTheme.error, size: 20),
                  ],
                ),
              ),
            );
          }),
          const SizedBox(height: 16),
          if (_answerChecked == null)
            ElevatedButton(
              onPressed: _selectedAnswer != null ? _checkReading : null,
              child: const Text('Tekshirish'),
            ),
          if (_answerChecked == true)
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: _readingDone
                    ? AppTheme.success.withOpacity(0.1)
                    : AppTheme.error.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                children: [
                  Icon(
                    _readingDone ? Icons.check_circle : Icons.info,
                    color: _readingDone ? AppTheme.success : AppTheme.error,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    _readingDone
                        ? '✅ To\'g\'ri! +10 XP'
                        : '❌ Noto\'g\'ri. Qaytadan urinib ko\'ring.',
                    style: TextStyle(
                      color: _readingDone ? AppTheme.success : AppTheme.error,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildListeningTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '🎧 Tinglang va yozing',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 16),
          // Listen buttons
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () => _speak(widget.lesson.listening),
                  icon: const Icon(Icons.volume_up),
                  label: const Text('Eshittirish'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () => _speakSlow(widget.lesson.listening),
                  icon: const Icon(Icons.speed),
                  label: const Text('Sekin'),
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: AppTheme.primary),
                    foregroundColor: AppTheme.primary,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Text(
            'Javobingiz:',
            style: TextStyle(fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: _listenAnswer.isNotEmpty ? TextEditingController(text: _listenAnswer) : null,
            onChanged: (v) => _listenAnswer = v,
            decoration: const InputDecoration(
              hintText: 'Javobingizni yozing...',
            ),
            maxLines: 2,
          ),
          const SizedBox(height: 12),
          ElevatedButton(
            onPressed: _listenAnswer.isNotEmpty ? _checkListening : null,
            child: const Text('Tekshirish'),
          ),
          if (_listeningDone) ...[
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.success.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Row(
                children: [
                  Icon(Icons.check_circle, color: AppTheme.success),
                  SizedBox(width: 8),
                  Text(
                    '✅ To\'g\'ri! +10 XP',
                    style: TextStyle(
                      color: AppTheme.success,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildWritingTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '✍️ Yozing',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 12),
          // Writing prompt
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.card,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Topshiriq:',
                  style: TextStyle(
                    color: AppTheme.accent,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  widget.lesson.w,
                  style: const TextStyle(fontSize: 15),
                ),
                const SizedBox(height: 8),
                Text(
                  'Namuna: ${widget.lesson.ws}',
                  style: const TextStyle(
                    color: AppTheme.textSecondary,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _writingController,
            maxLines: 4,
            decoration: const InputDecoration(
              hintText: 'Inglizcha javobingizni yozing...',
              alignLabelWithHint: true,
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton(
            onPressed: _checkWriting,
            child: const Text('Tekshirish'),
          ),
          if (_writingFeedback.isNotEmpty) ...[
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: _writingDone
                    ? AppTheme.success.withOpacity(0.1)
                    : AppTheme.warning.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                _writingFeedback,
                style: TextStyle(
                  color: _writingDone ? AppTheme.success : AppTheme.warning,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
          // Vocabulary
          const SizedBox(height: 20),
          const Text(
            '💡 Yordamchi so\'zlar:',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: AppTheme.accent,
            ),
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: widget.lesson.vocab.map((v) {
              return GestureDetector(
                onTap: () => _speak(v[0]),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.card,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        v[0],
                        style: const TextStyle(
                          color: AppTheme.accent,
                          fontWeight: FontWeight.w600,
                          fontSize: 13,
                        ),
                      ),
                      const Icon(Icons.volume_up, size: 14, color: AppTheme.textSecondary),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildSpeakingTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '🗣 Ovozli mashq',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 16),
          // Speaking prompt
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.card,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Topshiriq:',
                  style: TextStyle(
                    color: AppTheme.accent,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  widget.lesson.sp,
                  style: const TextStyle(fontSize: 15),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          // Mic button
          Center(
            child: GestureDetector(
              onTap: _startSpeaking,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: _isRecording
                      ? const LinearGradient(colors: [AppTheme.error, Color(0xFFDC2626)])
                      : AppTheme.primaryGradient,
                  boxShadow: [
                    BoxShadow(
                      color: (_isRecording ? AppTheme.error : AppTheme.primary).withOpacity(0.4),
                      blurRadius: 20,
                      spreadRadius: _isRecording ? 8 : 0,
                    ),
                  ],
                ),
                child: Icon(
                  _isRecording ? Icons.stop : Icons.mic,
                  color: Colors.white,
                  size: 36,
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Center(
            child: Text(
              _isRecording ? 'Gapiring... 🎤' : 'Mikrofonni bosing',
              style: TextStyle(
                color: _isRecording ? AppTheme.error : AppTheme.textSecondary,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          if (_spokenText.isNotEmpty) ...[
            const SizedBox(height: 20),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.card,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Siz aytdingiz:',
                    style: TextStyle(
                      color: AppTheme.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _spokenText,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            // Tips
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.primary.withOpacity(0.08),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                '💡 Tip: ${widget.lesson.g}',
                style: const TextStyle(
                  color: AppTheme.textSecondary,
                  fontSize: 13,
                ),
              ),
            ),
          ],
          // Text input fallback
          const SizedBox(height: 20),
          const Divider(),
          const SizedBox(height: 12),
          const Text(
            'Yoki matn kiriting:',
            style: TextStyle(
              color: AppTheme.textSecondary,
              fontSize: 13,
            ),
          ),
          const SizedBox(height: 8),
          TextField(
            onChanged: (v) => _spokenText = v,
            decoration: const InputDecoration(
              hintText: 'Inglizcha yozing...',
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton(
            onPressed: _spokenText.isNotEmpty ? () {
              setState(() {
                _speakingDone = _spokenText.length > 5;
              });
              _showResult(_speakingDone, 'Speaking');
            } : null,
            child: const Text('Tekshirish'),
          ),
        ],
      ),
    );
  }

  Widget _buildCompleteButton() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.background,
        border: Border(top: BorderSide(color: AppTheme.card)),
      ),
      child: SizedBox(
        width: double.infinity,
        child: ElevatedButton.icon(
          onPressed: _allSkillsDone ? () {
            // Award XP and go back
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('🎉 Dars tugallandi! +20 XP'),
                backgroundColor: AppTheme.success,
              ),
            );
            Navigator.pop(context);
          } : null,
          icon: const Icon(Icons.check_circle),
          label: Text(
            _allSkillsDone
                ? '✅ Darsni yakunlash (+20 XP)'
                : '⏳ Barcha ko\'nikmalarni bajaring',
          ),
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 16),
            backgroundColor: _allSkillsDone ? AppTheme.success : AppTheme.card,
          ),
        ),
      ),
    );
  }

  Color _getLevelColor(String level) {
    switch (level) {
      case 'A0': return AppTheme.primary;
      case 'A1': return AppTheme.success;
      case 'A2': return AppTheme.warning;
      case 'B1': return AppTheme.error;
      case 'B2': return AppTheme.secondary;
      case 'C1': return const Color(0xFFFB7185);
      default: return AppTheme.primary;
    }
  }
}
