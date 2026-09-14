import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class LevelTestScreen extends StatefulWidget {
  const LevelTestScreen({super.key});

  @override
  State<LevelTestScreen> createState() => _LevelTestScreenState();
}

class _LevelTestScreenState extends State<LevelTestScreen> {
  int _currentQuestion = 0;
  int _score = 0;
  int? _selectedAnswer;
  bool? _answerChecked;
  bool _testCompleted = false;
  String _detectedLevel = 'A0';

  final List<Map<String, dynamic>> _questions = [
    {
      'q': 'Complete: "She ___ a teacher."',
      'options': ['is', 'are', 'am', 'be'],
      'correct': 0,
      'level': 'A0',
    },
    {
      'q': 'What is the plural of "child"?',
      'options': ['childs', 'childes', 'children', 'childies'],
      'correct': 2,
      'level': 'A0',
    },
    {
      'q': '"I have ___ apple."',
      'options': ['a', 'an', 'the', 'one'],
      'correct': 1,
      'level': 'A0',
    },
    {
      'q': 'Choose the correct past tense: "She ___ to school yesterday."',
      'options': ['go', 'goes', 'went', 'going'],
      'correct': 2,
      'level': 'A1',
    },
    {
      'q': '"I am interested ___ learning English."',
      'options': ['in', 'on', 'at', 'for'],
      'correct': 0,
      'level': 'A1',
    },
    {
      'q': 'Which is correct?',
      'options': ['He don\'t like', 'He doesn\'t likes', 'He doesn\'t like', 'He not like'],
      'correct': 2,
      'level': 'A1',
    },
    {
      'q': '"I ___ already finished my homework."',
      'options': ['have', 'has', 'had', 'having'],
      'correct': 0,
      'level': 'A2',
    },
    {
      'q': '"If I ___ rich, I would travel the world."',
      'options': ['am', 'was', 'were', 'be'],
      'correct': 2,
      'level': 'A2',
    },
    {
      'q': '"She has been working here ___ 2019."',
      'options': ['for', 'since', 'from', 'in'],
      'correct': 1,
      'level': 'A2',
    },
    {
      'q': '"The book ___ by J.K. Rowling."',
      'options': ['wrote', 'was written', 'is writing', 'has wrote'],
      'correct': 1,
      'level': 'B1',
    },
    {
      'q': '"I wish I ___ more time."',
      'options': ['have', 'has', 'had', 'having'],
      'correct': 2,
      'level': 'B1',
    },
    {
      'q': '"Not only ___ smart, but also kind."',
      'options': ['she is', 'is she', 'she was', 'was she'],
      'correct': 1,
      'level': 'B1',
    },
    {
      'q': '"By the time I arrived, they ___ already left."',
      'options': ['have', 'had', 'has', 'having'],
      'correct': 1,
      'level': 'B1',
    },
    {
      'q': '"It is believed that he ___ the crime."',
      'options': ['committed', 'commit', 'committing', 'commits'],
      'correct': 0,
      'level': 'B2',
    },
    {
      'q': '"Had I known, I ___ differently."',
      'options': ['would act', 'would have acted', 'will act', 'acted'],
      'correct': 1,
      'level': 'B2',
    },
    {
      'q': '"She suggested that he ___ earlier."',
      'options': ['comes', 'came', 'come', 'coming'],
      'correct': 2,
      'level': 'B2',
    },
    {
      'q': '"___ it not been for your help, I would have failed."',
      'options': ['Has', 'Had', 'Have', 'Having'],
      'correct': 1,
      'level': 'C1',
    },
    {
      'q': '"Rarely ___ such a magnificent performance."',
      'options': ['I see', 'do I see', 'I have seen', 'have I see'],
      'correct': 1,
      'level': 'C1',
    },
    {
      'q': '"The reason ___ I am late is the traffic."',
      'options': ['why', 'what', 'which', 'how'],
      'correct': 0,
      'level': 'C1',
    },
    {
      'q': '"It was Ali ___ broke the window."',
      'options': ['which', 'whom', 'who', 'what'],
      'correct': 2,
      'level': 'C1',
    },
  ];

  void _checkAnswer() {
    if (_selectedAnswer == null) return;
    
    setState(() {
      _answerChecked = true;
      if (_selectedAnswer == _questions[_currentQuestion]['correct']) {
        _score++;
      }
    });

    Future.delayed(const Duration(seconds: 1), () {
      if (_currentQuestion < _questions.length - 1) {
        setState(() {
          _currentQuestion++;
          _selectedAnswer = null;
          _answerChecked = null;
        });
      } else {
        _calculateLevel();
        setState(() => _testCompleted = true);
      }
    });
  }

  void _calculateLevel() {
    final percentage = (_score / _questions.length) * 100;
    if (percentage >= 90) {
      _detectedLevel = 'C1';
    } else if (percentage >= 75) {
      _detectedLevel = 'B2';
    } else if (percentage >= 60) {
      _detectedLevel = 'B1';
    } else if (percentage >= 45) {
      _detectedLevel = 'A2';
    } else if (percentage >= 25) {
      _detectedLevel = 'A1';
    } else {
      _detectedLevel = 'A0';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: _testCompleted ? _buildResult() : _buildQuestion(),
      ),
    );
  }

  Widget _buildQuestion() {
    final question = _questions[_currentQuestion];
    final progress = (_currentQuestion + 1) / _questions.length;

    return Column(
      children: [
        // Header
        Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.arrow_back_ios),
                  ),
                  const Text(
                    '📝 Daraja testi',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              // Progress
              Row(
                children: [
                  Text(
                    '${_currentQuestion + 1}/${_questions.length}',
                    style: const TextStyle(
                      color: AppTheme.textSecondary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Spacer(),
                  Text(
                    'Score: $_score',
                    style: const TextStyle(
                      color: AppTheme.accent,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: LinearProgressIndicator(
                  value: progress,
                  backgroundColor: AppTheme.card,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    AppTheme.primary.withOpacity(0.8),
                  ),
                  minHeight: 8,
                ),
              ),
            ],
          ),
        ),
        // Question
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Level badge
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppTheme.primary.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    question['level'],
                    style: const TextStyle(
                      color: AppTheme.primary,
                      fontWeight: FontWeight.w700,
                      fontSize: 12,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  question['q'],
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 20),
                // Options
                ...List.generate(4, (i) {
                  final isSelected = _selectedAnswer == i;
                  final isCorrect = i == question['correct'];
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
                      margin: const EdgeInsets.only(bottom: 10),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: bgColor ?? AppTheme.card,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: borderColor ?? AppTheme.card,
                          width: isSelected ? 2 : 1,
                        ),
                      ),
                      child: Row(
                        children: [
                          Container(
                            width: 32,
                            height: 32,
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
                          const SizedBox(width: 14),
                          Expanded(
                            child: Text(
                              question['options'][i],
                              style: TextStyle(
                                fontSize: 15,
                                color: showResult
                                    ? (isCorrect ? AppTheme.success : (isSelected ? AppTheme.error : AppTheme.text))
                                    : AppTheme.text,
                              ),
                            ),
                          ),
                          if (showResult && isCorrect)
                            const Icon(Icons.check_circle, color: AppTheme.success, size: 22),
                          if (showResult && isSelected && !isCorrect)
                            const Icon(Icons.cancel, color: AppTheme.error, size: 22),
                        ],
                      ),
                    ),
                  );
                }),
              ],
            ),
          ),
        ),
        // Check button
        Padding(
          padding: const EdgeInsets.all(16),
          child: SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _selectedAnswer != null && _answerChecked == null
                  ? _checkAnswer
                  : null,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: Text(
                _answerChecked == true
                    ? (_currentQuestion < _questions.length - 1 ? 'Keyingi →' : 'Natija →')
                    : 'Tekshirish',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildResult() {
    final percentage = (_score / _questions.length * 100).round();
    
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Result circle
          Container(
            width: 150,
            height: 150,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: AppTheme.primaryGradient,
              boxShadow: [
                BoxShadow(
                  color: AppTheme.primary.withOpacity(0.4),
                  blurRadius: 30,
                  spreadRadius: 5,
                ),
              ],
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    _detectedLevel,
                    style: const TextStyle(
                      fontSize: 42,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                    ),
                  ),
                  Text(
                    '$percentage%',
                    style: const TextStyle(
                      fontSize: 16,
                      color: Colors.white70,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Tabriklaymiz! 🎉',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Sizning darajangiz: $_detectedLevel',
            style: const TextStyle(
              fontSize: 18,
              color: AppTheme.textSecondary,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '$_score / ${_questions.length} to\'g\'ri javob',
            style: const TextStyle(
              fontSize: 16,
              color: AppTheme.accent,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 32),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {
                // Navigate to lessons at detected level
                Navigator.pop(context);
              },
              icon: const Icon(Icons.play_arrow),
              label: Text('$_detectedLevel darajadan boshlash'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: () {
                setState(() {
                  _currentQuestion = 0;
                  _score = 0;
                  _selectedAnswer = null;
                  _answerChecked = null;
                  _testCompleted = false;
                });
              },
              icon: const Icon(Icons.refresh),
              label: const Text('Qaytadan o\'tkazish'),
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                side: const BorderSide(color: AppTheme.primary),
                foregroundColor: AppTheme.primary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
