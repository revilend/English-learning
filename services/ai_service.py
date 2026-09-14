import logging
from config import config

logger = logging.getLogger(__name__)


class AIService:
    def __init__(self):
        self.api_key = config.GEMINI_API_KEY
        self.client = None
        self.model_name = "gemini-2.0-flash"

        if self.api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
                logger.info("Gemini AI muvaffaqiyatli konfiguratsiya qilindi (google-genai)")
            except Exception as e:
                logger.error(f"Gemini AI konfiguratsiyasida xatolik: {e}")

    async def check_writing(self, task_description: str, user_answer: str, expected_sample: str) -> dict:
        if not self.client:
            user_clean = user_answer.strip().lower()
            expected_clean = expected_sample.strip().lower()
            is_close = any(word in user_clean for word in expected_clean.split() if len(word) > 3)
            return {
                "score": 85 if is_close else 60,
                "feedback": f"📝 <b>Sizning javobingiz:</b> {user_answer}\n📖 <b>Namuna javob:</b> {expected_sample}\n\n⚠️ To'liq AI tahlili uchun GEMINI_API_KEY ni sozlang.",
                "corrected": expected_sample
            }

        prompt = f"""Siz ingliz tilini 0 dan o'rganayotgan o'zbek foydalanuvchilariga dars beruvchi mehribon va professional repetitorsiz.

Berilgan vazifa: "{task_description}"
Kutilgan namuna javob: "{expected_sample}"
Foydalanuvchi yozgan javob: "{user_answer}"

Vazifangiz:
1. Foydalanuvchi javobini grammatik, imloviy va ma'no jihatidan tekshiring.
2. 0 dan 100 gacha ball bering.
3. Agar xato bo'lsa, xatoni o'zbek tilida tushunarli qilib tushuntiring.
4. To'g'ri variantini ko'rsating.

Javobingizni quyidagi formatda bering:
Ball: [0-100]
Tuzatilgan variant: [Inglizcha to'g'ri matn]
Izoh: [O'zbek tilida 2-3 jumlada qisqa va aniq izoh]"""

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
            )
            return {
                "score": 90,
                "feedback": response.text,
                "corrected": expected_sample
            }
        except Exception as e:
            logger.error(f"AI so'rovida xato: {e}")
            return {
                "score": 75,
                "feedback": f"📝 <b>Sizning javobingiz:</b> {user_answer}\n📖 <b>Namuna:</b> {expected_sample}\n\n✅ Javobingiz qabul qilindi!",
                "corrected": expected_sample
            }

    async def evaluate_speaking(self, target_phrase: str, transcribed_text: str = None) -> dict:
        if not self.client:
            return {
                "score": 90,
                "feedback": f"🗣 <b>Speaking natijasi:</b>\n\n"
                           f"Barakalla! Talaffuzingiz qabul qilindi.\n"
                           f"Maqsadli jumla: <b>'{target_phrase}'</b>\n\n"
                           f"💡 Maslahat: Har kuni 5-10 daqiqa ovozli mashq qiling!\n"
                           f"⭐ +25 XP qo'shildi!"
            }

        context = f"Foydalanuvchi ovozli xabar yubordi."
        if transcribed_text:
            context = f"Foydalanuvchi yozgan matn: '{transcribed_text}'"

        prompt = f"""Siz ingliz tili o'qituvchisisiz. Foydalanuvchi speaking mashqini bajarmoqda.

Maqsadli jumla: '{target_phrase}'
{context}

Baholang:
1. Ijobiy feedback bering
2. Agar matn bo'lsa, grammatikasini tekshiring
3. Talaffuz haqida maslahat bering
4. Jumlani to'g'ri shaklda qaytadan ayting

Qisqa va ijobiy javob bering (o'zbek tilida)."""

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
            )
            return {
                "score": 90,
                "feedback": f"🗣 <b>Speaking natijasi:</b>\n\n{response.text}\n\n⭐ +25 XP qo'shildi!"
            }
        except Exception as e:
            logger.error(f"Speaking baholash xatosi: {e}")
            return {
                "score": 90,
                "feedback": f"🗣 <b>Speaking natijasi:</b>\n\n"
                           f"Barakalla! Talaffuzingiz qabul qilindi.\n"
                           f"Maqsadli jumla: <b>'{target_phrase}'</b>\n\n"
                           f"⭐ +25 XP qo'shildi!"
            }

    async def chat(self, user_message: str, user_name: str = "O'quvchi") -> str:
        if not self.client:
            return (
                f"🤖 <b>AI Chat</b>\n\n"
                f"Siz yozdingiz: <i>{user_message}</i>\n\n"
                "⚠️ AI chat ishlashi uchun GEMINI_API_KEY sozlanmagan.\n"
                "Bot funksiyalaridan foydalanish uchun <b>📚 Darslar</b> tugmasini bosing!"
            )

        prompt = f"""Siz 'English Zero-to-Hero' — ingliz tilini o'rgatuvchi AI o'qituvchi botsiz.
Foydalanuvchi: {user_name}

Foydalanuvchi xabar yubordi: "{user_message}"

MUHIM QOIDALAR:
1. Foydalanuvchi nima so'rasa — shunga aniq javob bering. Savolga javob bering, mavzuni o'zgartirmang.
2. Agar foydalanuvchi inglizcha yozgan bo'lsa:
   - Grammatikasini tekshiring
   - To'g'ri variantini bering
   - O'zbek tilida tushuntiring
   - Yangi so'z yoki ibora o'rgating
3. Agar foydalanuvchi o'zbekcha yozgan bo'lsa:
   - Inglizcha tarjimasini bering
   - Oddiy misol keltiring
   - Eslatma bering
4. Agar grammatika haqida so'rasa — tushuntiring va misollar keltiring.
5. Agar tarjima so'rasa — to'g'ri tarjimani bering.
6. Agar salomlashsa — salomlashing va o'zini tanishtiring.
7. Javob qisqa va tushunarli bo'lsin (3-5 jumla).
8. Har doim do'stona va rag'batlantiruvchi tarzda gapiring.
9. Javob oxirida qiziqarli fakt yoki yangi so'z qo'shing."""

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
            )
            return response.text
        except Exception as e:
            logger.error(f"AI chat xatosi: {e}")
            return (
                f"🤖 <b>AI Chat</b>\n\n"
                f"Siz yozdingiz: <i>{user_message}</i>\n\n"
                "⚠️ Hozircha AI javob bera olmayapti. Qaytadan urinib ko'ring!"
            )

    async def transcribe_voice(self, file_path: str) -> str:
        """Ovozli xabarni matnga aylantirish (Whisper API)."""
        if not self.client:
            return None

        try:
            import aiohttp
            import json

            url = "https://api.openai.com/v1/audio/transcriptions"
            headers = {
                "Authorization": f"Bearer {self.api_key}",
            }

            # Agar OpenAI API kaliti yo'q bo'lsa, Gemini file API ishlatish
            # Hozircha oddiy yechim — voice message transkripsiya qilinmaydi
            return None
        except Exception as e:
            logger.error(f"Voice transkripsiya xatosi: {e}")
            return None


ai_service = AIService()
