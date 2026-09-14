import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/app_theme.dart';
import 'lessons_screen.dart';
import 'level_test_screen.dart';
import 'flashcards_screen.dart';
import 'progress_screen.dart';
import 'chat_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> with SingleTickerProviderStateMixin {
  late AnimationController _animController;
  int _xp = 0;
  int _streak = 0;
  int _completedLessons = 0;
  String _level = 'A0';
  final int _totalLessons = 50;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..forward();
    _loadProgress();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  void _loadProgress() {
    // TODO: Load from SharedPreferences
    setState(() {
      _xp = 20;
      _streak = 0;
      _completedLessons = 1;
      _level = 'A0';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Particle background
          CustomPaint(
            size: MediaQuery.of(context).size,
            painter: ParticlePainter(),
          ),
          // Content
          SafeArea(
            child: CustomScrollView(
              slivers: [
                // Top Stats Bar
                SliverToBoxAdapter(
                  child: _buildTopBar(),
                ),
                // Hero Section
                SliverToBoxAdapter(
                  child: _buildHero(),
                ),
                // Word of the Day
                SliverToBoxAdapter(
                  child: _buildWordOfDay(),
                ),
                // Quick Actions
                SliverToBoxAdapter(
                  child: _buildQuickActions(),
                ),
                // AI Chat CTA
                SliverToBoxAdapter(
                  child: _buildChatCTA(),
                ),
                // How it Works
                SliverToBoxAdapter(
                  child: _buildHowItWorks(),
                ),
                const SliverToBoxAdapter(
                  child: SizedBox(height: 100),
                ),
              ],
            ),
          ),
          // Chat FAB
          Positioned(
            right: 16,
            bottom: 18,
            child: _buildChatFAB(),
          ),
        ],
      ),
    );
  }

  Widget _buildTopBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          // Logo
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              gradient: AppTheme.primaryGradient,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Row(
              children: [
                Icon(Icons.language, color: Colors.white, size: 20),
                SizedBox(width: 6),
                Text(
                  'A-Z',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w800,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          // Title
          const Text(
            'English Zero-to-Hero',
            style: TextStyle(
              fontWeight: FontWeight.w800,
              fontSize: 16,
            ),
          ),
          const Spacer(),
          // Stats
          _buildStatBadge(Icons.star, '$_xp', AppTheme.accent),
          const SizedBox(width: 8),
          _buildStatBadge(Icons.local_fire_department, '$_streak', AppTheme.error),
          const SizedBox(width: 8),
          _buildStatBadge(Icons.book, '$_completedLessons/$_totalLessons', AppTheme.primary),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: AppTheme.primary.withOpacity(0.15),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: AppTheme.primary.withOpacity(0.3)),
            ),
            child: Text(
              _level,
              style: const TextStyle(
                color: AppTheme.primary,
                fontWeight: FontWeight.w700,
                fontSize: 12,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatBadge(IconData icon, String value, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.04),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.card),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: color, size: 14),
          const SizedBox(width: 4),
          Text(
            value,
            style: TextStyle(
              color: color,
              fontWeight: FontWeight.w700,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHero() {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          // Badge
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.primary.withOpacity(0.2),
                  AppTheme.secondary.withOpacity(0.2),
                ],
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.primary.withOpacity(0.3)),
            ),
            child: const Text(
              '🇺🇸 ENGLISH ZERO-TO-HERO',
              style: TextStyle(
                color: AppTheme.accent,
                fontWeight: FontWeight.w600,
                fontSize: 12,
                letterSpacing: 1,
              ),
            ),
          ),
          const SizedBox(height: 20),
          // Title
          ShaderMask(
            shaderCallback: (bounds) => AppTheme.primaryGradient.createShader(bounds),
            child: const Text(
              'Ingliz tilini\n0 dan o\'rganing',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w900,
                color: Colors.white,
                height: 1.2,
              ),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            '$_totalLessons dars · 4 ko\'nikma · AI yordamida\nA0 dan C1 gacha',
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: AppTheme.textSecondary,
              fontSize: 14,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 24),
          // Buttons
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const LessonsScreen()),
                  ),
                  icon: const Icon(Icons.play_arrow),
                  label: const Text('Boshlash'),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const LevelTestScreen()),
                  ),
                  icon: const Icon(Icons.quiz),
                  label: const Text('Daraja testi'),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    side: const BorderSide(color: AppTheme.primary),
                    foregroundColor: AppTheme.primary,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildWordOfDay() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.primary.withOpacity(0.15),
            AppTheme.secondary.withOpacity(0.1),
            AppTheme.error.withOpacity(0.08),
          ],
          begin: Alignment.topLeft,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.primary.withOpacity(0.2)),
        boxShadow: [
          BoxShadow(
            color: AppTheme.primary.withOpacity(0.15),
            blurRadius: 30,
            spreadRadius: 5,
          ),
        ],
      ),
      child: Column(
        children: [
          const Text(
            '📖 BUGUNGI SO\'Z',
            style: TextStyle(
              color: AppTheme.textSecondary,
              fontSize: 11,
              letterSpacing: 1.5,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Beautiful',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.w900,
            ),
          ),
          const Text(
            'Chiroyli',
            style: TextStyle(
              fontSize: 18,
              color: AppTheme.textSecondary,
            ),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Text(
              '"She is very beautiful."',
              style: TextStyle(
                fontSize: 13,
                fontStyle: FontStyle.italic,
                color: AppTheme.textSecondary,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActions() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.rocket_launch, color: AppTheme.accent, size: 18),
              SizedBox(width: 8),
              Text(
                'Tezkor boshlash',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.2,
            children: [
              _buildActionCard(
                icon: '📚',
                title: 'Darslar',
                subtitle: '$_totalLessons dars',
                onTap: () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const LessonsScreen()),
                ),
              ),
              _buildActionCard(
                icon: '📝',
                title: 'Daraja testi',
                subtitle: '20 ta savol',
                onTap: () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const LevelTestScreen()),
                ),
              ),
              _buildActionCard(
                icon: '🃏',
                title: 'Flashcards',
                subtitle: '100+ so\'z',
                onTap: () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const FlashcardsScreen()),
                ),
              ),
              _buildActionCard(
                icon: '📊',
                title: 'Rivojlanish',
                subtitle: 'XP, streak',
                onTap: () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const ProgressScreen()),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActionCard({
    required String icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: AppTheme.glassDecoration,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(icon, style: const TextStyle(fontSize: 28)),
            const Spacer(),
            Text(
              title,
              style: const TextStyle(
                fontWeight: FontWeight.w700,
                fontSize: 14,
              ),
            ),
            Text(
              subtitle,
              style: const TextStyle(
                color: AppTheme.textSecondary,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChatCTA() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(20),
      decoration: AppTheme.glassDecoration,
      child: Column(
        children: [
          const Text('🤖', style: TextStyle(fontSize: 36)),
          const SizedBox(height: 8),
          const Text(
            'AI bilan suhbat',
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 4),
          const Text(
            'AI o\'qituvchi bilan yozib qoling',
            style: TextStyle(
              color: AppTheme.textSecondary,
              fontSize: 13,
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            onPressed: () {
              // Show chat overlay
            },
            icon: const Icon(Icons.chat),
            label: const Text('AI bilan gaplashish'),
          ),
        ],
      ),
    );
  }

  Widget _buildHowItWorks() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.auto_awesome, color: AppTheme.accent, size: 18),
              SizedBox(width: 8),
              Text(
                'Qanday ishlaydi',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.3,
            children: [
              _buildFeatureCard('📖', 'Reading', 'Matn o\'qish va test'),
              _buildFeatureCard('🎧', 'Listening', 'Audio diktant'),
              _buildFeatureCard('✍️', 'Writing', 'AI tekshiradi'),
              _buildFeatureCard('🗣', 'Speaking', 'Ovozli mashq'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureCard(String icon, String title, String subtitle) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: AppTheme.glassDecoration,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: AppTheme.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Center(child: Text(icon, style: const TextStyle(fontSize: 24))),
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 13,
            ),
          ),
          Text(
            subtitle,
            style: const TextStyle(
              color: AppTheme.textSecondary,
              fontSize: 11,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChatFAB() {
    return FloatingActionButton(
      onPressed: () => Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => const ChatScreen()),
      ),
      backgroundColor: AppTheme.primary,
      child: const Icon(Icons.chat, color: Colors.white),
    );
  }
}

class ParticlePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;

    // Draw gradient background
    final bgPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [
          AppTheme.primary.withOpacity(0.05),
          Colors.transparent,
          AppTheme.secondary.withOpacity(0.03),
        ],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    // Draw subtle dots
    paint.color = AppTheme.primary.withOpacity(0.08);
    for (int i = 0; i < 50; i++) {
      final x = (i * 37.0) % size.width;
      final y = (i * 47.0) % size.height;
      canvas.drawCircle(Offset(x, y), 1.5, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
