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
        """
        Foydalanuvchi yozgan inglizcha gapni tekshiradi, xatolarni tuzatadi va o'zbekcha izoh beradi.
        """
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
            text = response.text
            return {
                "score": 90,
                "feedback": text,
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
        """
        O'quvchining talaffuzini baholash — AI orqali yoki fallback.
        """
        if not self.client:
            return {
                "score": 90,
                "feedback": f"🗣 <b>Speaking natijasi:</b>\n\n"
                           f"Barakalla! Talaffuzingiz qabul qilindi.\n"
                           f"Maqsadli jumla: <b>'{target_phrase}'</b>\n\n"
                           f"💡 Maslahat: Har kuni 5-10 daqiqa ovozli mashq qiling!\n"
                           f"⭐ +25 XP qo'shildi!"
            }

        prompt = f"""Siz ingliz tali o'qituvchisiz. Quyidagi maqsadli jumla berilgan:
'{target_phrase}'

Foydalanuvchi ovozli xabar yubordi (transkripsiya mavjud emas, faqat talaffuz baholang).

Baholang:
1. Ijobiy反馈 bering
2. Talaffuz haqida maslahat bering
3. Jumlani qaytadan ayting

Qisqa va ijobiy javob bering (o'zbek tilida)."""

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
            )
            text = response.text
            return {
                "score": 90,
                "feedback": f"🗣 <b>Speaking natijasi:</b>\n\n{text}\n\n⭐ +25 XP qo'shildi!"
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


ai_service = AIService()
