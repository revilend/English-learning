import aiosqlite
import os
from datetime import datetime, timedelta
from config import config

class Database:
    def __init__(self, db_path: str = None):
        self.db_path = db_path or config.DATABASE_PATH
        os.makedirs(os.path.dirname(self.db_path) or ".", exist_ok=True)

    async def init_db(self):
        async with aiosqlite.connect(self.db_path) as conn:
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    user_id INTEGER PRIMARY KEY,
                    username TEXT,
                    full_name TEXT,
                    level TEXT DEFAULT 'A0',
                    current_lesson INTEGER DEFAULT 1,
                    xp INTEGER DEFAULT 0,
                    streak INTEGER DEFAULT 1,
                    last_active TEXT,
                    created_at TEXT
                )
            """)
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS completed_skills (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    lesson_id INTEGER,
                    skill TEXT,
                    completed_at TEXT,
                    UNIQUE(user_id, lesson_id, skill)
                )
            """)
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS vocab_cards (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    word TEXT,
                    translation TEXT,
                    ease_factor REAL DEFAULT 2.5,
                    interval_days INTEGER DEFAULT 1,
                    repetition_count INTEGER DEFAULT 0,
                    next_review TEXT,
                    UNIQUE(user_id, word)
                )
            """)
            await conn.commit()

    async def get_or_create_user(self, user_id: int, username: str, full_name: str):
        async with aiosqlite.connect(self.db_path) as conn:
            conn.row_factory = aiosqlite.Row
            cursor = await conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
            user = await cursor.fetchone()
            now = datetime.now().isoformat()
            if not user:
                await conn.execute("""
                    INSERT INTO users (user_id, username, full_name, level, current_lesson, xp, streak, last_active, created_at)
                    VALUES (?, ?, ?, 'A0', 1, 0, 1, ?, ?)
                """, (user_id, username, full_name, now, now))
                await conn.commit()
                cursor = await conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
                user = await cursor.fetchone()
            else:
                # Update last_active
                await conn.execute("UPDATE users SET last_active = ?, username = ?, full_name = ? WHERE user_id = ?", 
                                   (now, username, full_name, user_id))
                await conn.commit()
            return dict(user)

    async def get_user(self, user_id: int):
        async with aiosqlite.connect(self.db_path) as conn:
            conn.row_factory = aiosqlite.Row
            cursor = await conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
            user = await cursor.fetchone()
            return dict(user) if user else None

    async def add_xp(self, user_id: int, amount: int):
        async with aiosqlite.connect(self.db_path) as conn:
            await conn.execute("UPDATE users SET xp = xp + ? WHERE user_id = ?", (amount, user_id))
            await conn.commit()

    async def mark_skill_completed(self, user_id: int, lesson_id: int, skill: str):
        now = datetime.now().isoformat()
        async with aiosqlite.connect(self.db_path) as conn:
            await conn.execute("""
                INSERT OR IGNORE INTO completed_skills (user_id, lesson_id, skill, completed_at)
                VALUES (?, ?, ?, ?)
            """, (user_id, lesson_id, skill, now))
            
            # Check if all 4 skills for this lesson are completed
            cursor = await conn.execute("""
                SELECT COUNT(DISTINCT skill) FROM completed_skills 
                WHERE user_id = ? AND lesson_id = ?
            """, (user_id, lesson_id))
            count = (await cursor.fetchone())[0]
            
            # If 4 skills done, advance current_lesson if it matches
            if count >= 4:
                cursor2 = await conn.execute("SELECT current_lesson FROM users WHERE user_id = ?", (user_id,))
                cur_row = await cursor2.fetchone()
                if cur_row and cur_row[0] == lesson_id:
                    await conn.execute("UPDATE users SET current_lesson = current_lesson + 1 WHERE user_id = ?", (user_id,))
            
            await conn.commit()
            return count

    async def get_lesson_skills_status(self, user_id: int, lesson_id: int):
        async with aiosqlite.connect(self.db_path) as conn:
            cursor = await conn.execute("""
                SELECT skill FROM completed_skills WHERE user_id = ? AND lesson_id = ?
            """, (user_id, lesson_id))
            rows = await cursor.fetchall()
            completed = {row[0] for row in rows}
            return {
                "reading": "reading" in completed,
                "listening": "listening" in completed,
                "writing": "writing" in completed,
                "speaking": "speaking" in completed,
            }

    async def add_vocab_word(self, user_id: int, word: str, translation: str):
        next_review = (datetime.now() + timedelta(days=1)).isoformat()
        async with aiosqlite.connect(self.db_path) as conn:
            await conn.execute("""
                INSERT OR IGNORE INTO vocab_cards (user_id, word, translation, next_review)
                VALUES (?, ?, ?, ?)
            """, (user_id, word, translation, next_review))
            await conn.commit()

    async def get_words_for_review(self, user_id: int, limit: int = 5):
        now = datetime.now().isoformat()
        async with aiosqlite.connect(self.db_path) as conn:
            conn.row_factory = aiosqlite.Row
            cursor = await conn.execute("""
                SELECT * FROM vocab_cards 
                WHERE user_id = ? AND next_review <= ?
                ORDER BY next_review ASC LIMIT ?
            """, (user_id, now, limit))
            rows = await cursor.fetchall()
            return [dict(r) for r in rows]

    async def get_leaderboard(self, limit: int = 10):
        async with aiosqlite.connect(self.db_path) as conn:
            conn.row_factory = aiosqlite.Row
            cursor = await conn.execute("""
                SELECT full_name, username, xp, current_lesson 
                FROM users 
                ORDER BY xp DESC LIMIT ?
            """, (limit,))
            rows = await cursor.fetchall()
            return [dict(r) for r in rows]

    async def update_user_level(self, user_id: int, level: str, lesson_start: int):
        async with aiosqlite.connect(self.db_path) as conn:
            await conn.execute(
                "UPDATE users SET level = ?, current_lesson = ? WHERE user_id = ?",
                (level, lesson_start, user_id)
            )
            await conn.commit()
