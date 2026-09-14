import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';
import '../theme/app_theme.dart';
import '../models/lesson_model.dart';

class FlashcardsScreen extends StatefulWidget {
  const FlashcardsScreen({super.key});

  @override
  State<FlashcardsScreen> createState() => _FlashcardsScreenState();
}

class _FlashcardsScreenState extends State<FlashcardsScreen> {
  final FlutterTts _tts = FlutterTts();
  bool _isFlipped = false;
  int _currentIndex = 0;
  String _searchQuery = '';
  final TextEditingController _searchController = TextEditingController();

  // All vocabulary from lessons
  List<List<String>> _allWords = [];
  List<List<String>> _filteredWords = [];

  @override
  void initState() {
    super.initState();
    _loadWords();
    _tts.setLanguage('en-US');
    _tts.setSpeechRate(0.9);
  }

  void _loadWords() {
    for (var lesson in LessonData.lessons) {
      _allWords.addAll(lesson.vocab);
    }
    _filteredWords = List.from(_allWords);
  }

  void _filterWords(String query) {
    setState(() {
      _searchQuery = query;
      if (query.isEmpty) {
        _filteredWords = List.from(_allWords);
      } else {
        _filteredWords = _allWords.where((word) {
          return word[0].toLowerCase().contains(query.toLowerCase()) ||
              word[1].toLowerCase().contains(query.toLowerCase());
        }).toList();
      }
      _currentIndex = 0;
      _isFlipped = false;
    });
  }

  Future<void> _speak(String text) async {
    await _tts.speak(text);
  }

  void _nextCard() {
    setState(() {
      _isFlipped = false;
      _currentIndex = (_currentIndex + 1) % _filteredWords.length;
    });
  }

  void _prevCard() {
    setState(() {
      _isFlipped = false;
      _currentIndex = (_currentIndex - 1 + _filteredWords.length) % _filteredWords.length;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
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
                      const Text(
                        '🃏 Flashcards',
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  // Search
                  TextField(
                    controller: _searchController,
                    onChanged: _filterWords,
                    decoration: InputDecoration(
                      hintText: "So'z yoki tarjima qidirish...",
                      prefixIcon: const Icon(Icons.search, color: AppTheme.textSecondary),
                      suffixIcon: _searchQuery.isNotEmpty
                          ? IconButton(
                              onPressed: () {
                                _searchController.clear();
                                _filterWords('');
                              },
                              icon: const Icon(Icons.clear, color: AppTheme.textSecondary),
                            )
                          : null,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    "${_filteredWords.length} ta so'z",
                    style: const TextStyle(
                      color: AppTheme.textSecondary,
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ),
            // Flashcard
            Expanded(
              child: _filteredWords.isEmpty
                  ? const Center(
                      child: Text(
                        "Hech narsa topilmadi",
                        style: TextStyle(color: AppTheme.textSecondary),
                      ),
                    )
                  : _buildFlashcard(),
            ),
            // Navigation
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  // Card counter
                  Text(
                    '${_currentIndex + 1} / ${_filteredWords.length}',
                    style: const TextStyle(
                      color: AppTheme.textSecondary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 12),
                  // Nav buttons
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _buildNavButton(Icons.chevron_left, _prevCard),
                      const SizedBox(width: 16),
                      _buildNavButton(Icons.volume_up, () {
                        if (_filteredWords.isNotEmpty) {
                          _speak(_filteredWords[_currentIndex][0]);
                        }
                      }, isAccent: true),
                      const SizedBox(width: 16),
                      _buildNavButton(Icons.chevron_right, _nextCard),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFlashcard() {
    if (_filteredWords.isEmpty) return const SizedBox();
    
    final word = _filteredWords[_currentIndex];
    
    return GestureDetector(
      onTap: () => setState(() => _isFlipped = !_isFlipped),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 400),
          curve: Curves.easeInOut,
          height: 240,
          decoration: BoxDecoration(
            gradient: _isFlipped
                ? null
                : AppTheme.primaryGradient,
            color: _isFlipped ? AppTheme.card : null,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: _isFlipped
                  ? AppTheme.primary.withOpacity(0.3)
                  : Colors.transparent,
            ),
            boxShadow: [
              BoxShadow(
                color: (_isFlipped ? AppTheme.primary : AppTheme.primary)
                    .withOpacity(0.3),
                blurRadius: 30,
                spreadRadius: 5,
              ),
            ],
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (_isFlipped) ...[
                  // Back (translation)
                  Text(
                    word[1],
                    style: const TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.text,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    word[0],
                    style: const TextStyle(
                      fontSize: 16,
                      color: AppTheme.textSecondary,
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _buildDifficultyButton('😊', () => _nextCard()),
                      const SizedBox(width: 16),
                      _buildDifficultyButton('😐', () => _nextCard()),
                      const SizedBox(width: 16),
                      _buildDifficultyButton('😫', () => _nextCard()),
                    ],
                  ),
                ] else ...[
                  // Front (English word)
                  Text(
                    word[0],
                    style: const TextStyle(
                      fontSize: 36,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  GestureDetector(
                    onTap: (e) {
                      e;
                      _speak(word[0]);
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.volume_up, color: Colors.white, size: 18),
                          SizedBox(width: 6),
                          Text(
                            'Talaffuz',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    'Bosing — tarjimani ko\'ring',
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.7),
                      fontSize: 13,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDifficultyButton(String emoji, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 48,
        height: 48,
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Center(
          child: Text(emoji, style: const TextStyle(fontSize: 24)),
        ),
      ),
    );
  }

  Widget _buildNavButton(IconData icon, VoidCallback onTap, {bool isAccent = false}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 56,
        height: 56,
        decoration: BoxDecoration(
          gradient: isAccent ? AppTheme.primaryGradient : null,
          color: isAccent ? null : AppTheme.card,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isAccent ? Colors.transparent : AppTheme.card,
          ),
        ),
        child: Icon(
          icon,
          color: isAccent ? Colors.white : AppTheme.textSecondary,
          size: 28,
        ),
      ),
    );
  }
}
