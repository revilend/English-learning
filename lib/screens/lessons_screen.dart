import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/lesson_model.dart';
import 'lesson_detail_screen.dart';

class LessonsScreen extends StatefulWidget {
  const LessonsScreen({super.key});

  @override
  State<LessonsScreen> createState() => _LessonsScreenState();
}

class _LessonsScreenState extends State<LessonsScreen> {
  String _selectedLevel = 'all';
  final List<String> _levels = ['all', 'A0', 'A1', 'A2', 'B1', 'B2', 'C1'];

  List<Lesson> get _filteredLessons {
    if (_selectedLevel == 'all') return LessonData.lessons;
    return LessonData.lessons.where((l) => l.level == _selectedLevel).toList();
  }

  int _maxOpenLesson() {
    // TODO: Load from local storage
    return 2; // First 2 lessons open by default
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
                        '📚 Darslar',
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  // Level filters
                  SizedBox(
                    height: 36,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: _levels.length,
                      itemBuilder: (context, index) {
                        final level = _levels[index];
                        final isSelected = _selectedLevel == level;
                        return Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: ChoiceChip(
                            label: Text(level == 'all' ? 'Barchasi' : level),
                            selected: isSelected,
                            onSelected: (selected) {
                              setState(() => _selectedLevel = level);
                            },
                            selectedColor: AppTheme.primary.withOpacity(0.2),
                            backgroundColor: AppTheme.card,
                            labelStyle: TextStyle(
                              color: isSelected ? AppTheme.primary : AppTheme.textSecondary,
                              fontWeight: FontWeight.w600,
                              fontSize: 12,
                            ),
                            side: BorderSide(
                              color: isSelected
                                  ? AppTheme.primary.withOpacity(0.5)
                                  : AppTheme.card,
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
            // Lessons list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _filteredLessons.length,
                itemBuilder: (context, index) {
                  final lesson = _filteredLessons[index];
                  final isOpen = lesson.id <= _maxOpenLesson();
                  return _buildLessonCard(lesson, isOpen);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLessonCard(Lesson lesson, bool isOpen) {
    final levelColor = _getLevelColor(lesson.level);
    
    return GestureDetector(
      onTap: isOpen
          ? () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => LessonDetailScreen(lesson: lesson),
                ),
              )
          : null,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppTheme.card,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isOpen
                ? levelColor.withOpacity(0.3)
                : AppTheme.card,
          ),
          boxShadow: isOpen
              ? [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ]
              : [],
        ),
        child: isOpen
            ? _buildOpenLesson(lesson, levelColor)
            : _buildLockedLesson(lesson),
      ),
    );
  }

  Widget _buildOpenLesson(Lesson lesson, Color levelColor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            // Level badge
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: levelColor.withOpacity(0.15),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: levelColor.withOpacity(0.3)),
              ),
              child: Text(
                lesson.level,
                style: TextStyle(
                  color: levelColor,
                  fontWeight: FontWeight.w700,
                  fontSize: 11,
                ),
              ),
            ),
            const Spacer(),
            // Lesson number
            Text(
              '#${lesson.id}',
              style: const TextStyle(
                color: AppTheme.textSecondary,
                fontWeight: FontWeight.w600,
                fontSize: 12,
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Text(
          lesson.title,
          style: const TextStyle(
            fontWeight: FontWeight.w700,
            fontSize: 16,
          ),
        ),
        const SizedBox(height: 8),
        // Skill badges
        Row(
          children: [
            _buildSkillBadge(Icons.book, '📖', true),
            const SizedBox(width: 6),
            _buildSkillBadge(Icons.headphones, '🎧', false),
            const SizedBox(width: 6),
            _buildSkillBadge(Icons.edit, '✍️', false),
            const SizedBox(width: 6),
            _buildSkillBadge(Icons.mic, '🗣', false),
          ],
        ),
        const SizedBox(height: 10),
        // Vocabulary count
        Text(
          '${lesson.vocab.length} so\'z',
          style: const TextStyle(
            color: AppTheme.accent,
            fontSize: 12,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  Widget _buildSkillBadge(IconData icon, String emoji, bool completed) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: completed
            ? AppTheme.success.withOpacity(0.15)
            : Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(
          color: completed
              ? AppTheme.success.withOpacity(0.3)
              : AppTheme.card,
        ),
      ),
      child: Text(
        emoji,
        style: TextStyle(
          fontSize: 14,
          color: completed ? AppTheme.success : AppTheme.textSecondary,
        ),
      ),
    );
  }

  Widget _buildLockedLesson(Lesson lesson) {
    return Opacity(
      opacity: 0.5,
      child: Row(
        children: [
          const Icon(Icons.lock, color: AppTheme.textSecondary, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  lesson.title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                    color: AppTheme.textSecondary,
                  ),
                ),
                Text(
                  lesson.level,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppTheme.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ],
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
