import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ProgressScreen extends StatefulWidget {
  const ProgressScreen({super.key});

  @override
  State<ProgressScreen> createState() => _ProgressScreenState();
}

class _ProgressScreenState extends State<ProgressScreen> {
  int _xp = 20;
  int _streak = 0;
  int _completedLessons = 1;
  String _level = 'A0';
  final int _totalLessons = 50;
  final int _dailyGoal = 50;
  final int _todayXp = 20;

  final List<Map<String, dynamic>> _achievements = [
    {'icon': '🌱', 'name': "Boshlang'ich", 'desc': '1 ta dars tugallash', 'unlocked': true},
    {'icon': '📚', 'name': "O'quvchi", 'desc': '5 ta dars tugallash', 'unlocked': false},
    {'icon': '🎓', 'name': 'Talaba', 'desc': '10 ta dars tugallash', 'unlocked': false},
    {'icon': '👨‍🏫', 'name': "Ustoz", 'desc': '34 ta dars tugallash', 'unlocked': false},
    {'icon': '⭐', 'name': "Yulduz", 'desc': '100 XP to\'plash', 'unlocked': false},
    {'icon': '🏆', 'name': 'Masters', 'desc': '500 XP to\'plash', 'unlocked': false},
    {'icon': '🥇', 'name': 'Chempion', 'desc': '1000 XP to\'plash', 'unlocked': false},
    {'icon': '🔥', 'name': 'Davomiy', 'desc': '3 kunlik streak', 'unlocked': false},
    {'icon': '💪', 'name': 'Haftalik', 'desc': '7 kunlik streak', 'unlocked': false},
    {'icon': '👑', 'name': 'Oylik', 'desc': '30 kunlik streak', 'unlocked': false},
    {'icon': '📗', 'name': 'A1 daraja', 'desc': 'A1 ga yetish', 'unlocked': false},
    {'icon': '📘', 'name': 'A2 daraja', 'desc': 'A2 ga yetish', 'unlocked': false},
    {'icon': '📕', 'name': 'B1 daraja', 'desc': 'B1 ga yetish', 'unlocked': false},
    {'icon': '📗', 'name': 'B2 daraja', 'desc': 'B2 ga yetish', 'unlocked': false},
    {'icon': '📕', 'name': 'C1 daraja', 'desc': 'C1 ga yetish', 'unlocked': false},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.arrow_back_ios),
                  ),
                  const Text(
                    '📊 Rivojlanish',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              // Stats grid
              GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 1.3,
                children: [
                  _buildStatCard('$_xp', '⭐ XP', AppTheme.accent),
                  _buildStatCard('$_completedLessons', '✅ Darslar', AppTheme.success),
                  _buildStatCard(_level, '🎯 Daraja', AppTheme.primary),
                  _buildStatCard('$_streak', '🔥 Streak', AppTheme.error),
                ],
              ),
              const SizedBox(height: 20),
              // Daily goal
              _buildDailyGoal(),
              const SizedBox(height: 20),
              // Level progress
              _buildLevelProgress(),
              const SizedBox(height: 20),
              // Achievements
              const Text(
                '🏆 Yutuqlar',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 12),
              ..._achievements.map((a) => _buildAchievement(a)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatCard(String value, String label, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.05),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            value,
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w800,
              color: color,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(
              color: AppTheme.textSecondary,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDailyGoal() {
    final progress = (_todayXp / _dailyGoal).clamp(0.0, 1.0);
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: AppTheme.glassDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Bugungi maqsad',
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  fontSize: 15,
                ),
              ),
              Text(
                '$_todayXp/$_dailyGoal XP',
                style: const TextStyle(
                  color: AppTheme.accent,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: AppTheme.card,
              valueColor: AlwaysStoppedAnimation<Color>(
                progress >= 1.0 ? AppTheme.success : AppTheme.primary,
              ),
              minHeight: 10,
            ),
          ),
          if (progress >= 1.0) ...[
            const SizedBox(height: 8),
            const Text(
              '✅ Bugungi maqsadingiz bajarildi!',
              style: TextStyle(
                color: AppTheme.success,
                fontWeight: FontWeight.w600,
                fontSize: 13,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildLevelProgress() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: AppTheme.glassDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Daraja taraqqiyoti',
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 15,
            ),
          ),
          const SizedBox(height: 16),
          _buildLevelBar('A0', 1.0, AppTheme.primary, true),
          const SizedBox(height: 8),
          _buildLevelBar('A1', 0.0, AppTheme.success, false),
          const SizedBox(height: 8),
          _buildLevelBar('A2', 0.0, AppTheme.warning, false),
          const SizedBox(height: 8),
          _buildLevelBar('B1', 0.0, AppTheme.error, false),
          const SizedBox(height: 8),
          _buildLevelBar('B2', 0.0, AppTheme.secondary, false),
          const SizedBox(height: 8),
          _buildLevelBar('C1', 0.0, const Color(0xFFFB7185), false),
        ],
      ),
    );
  }

  Widget _buildLevelBar(String level, double progress, Color color, bool isCurrent) {
    return Row(
      children: [
        SizedBox(
          width: 32,
          child: Text(
            level,
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 13,
              color: isCurrent ? color : AppTheme.textSecondary,
            ),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: AppTheme.card,
              valueColor: AlwaysStoppedAnimation<Color>(color),
              minHeight: 8,
            ),
          ),
        ),
        if (isCurrent) ...[
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: color.withOpacity(0.2),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Text(
              'HOZIR',
              style: TextStyle(
                color: color,
                fontSize: 10,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildAchievement(Map<String, dynamic> achievement) {
    final isUnlocked = achievement['unlocked'];
    
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isUnlocked
            ? AppTheme.primary.withOpacity(0.05)
            : AppTheme.card,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isUnlocked
              ? AppTheme.primary.withOpacity(0.3)
              : AppTheme.card,
        ),
      ),
      child: Row(
        children: [
          Text(
            achievement['icon'],
            style: TextStyle(
              fontSize: 28,
              color: isUnlocked ? null : Colors.grey.withOpacity(0.5),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  achievement['name'],
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 14,
                    color: isUnlocked ? AppTheme.text : AppTheme.textSecondary,
                  ),
                ),
                Text(
                  achievement['desc'],
                  style: const TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
          if (isUnlocked)
            const Icon(Icons.check_circle, color: AppTheme.success, size: 22)
          else
            const Icon(Icons.lock, color: AppTheme.textSecondary, size: 20),
        ],
      ),
    );
  }
}
