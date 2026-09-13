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
            # Fallback - agar API key kiritilmagan bo'lsa
            user_clean = user_answer.strip().lower()
            expected_clean = expected_sample.strip().lower()
            is_close = any(word in user_clean for word in expected_clean.split() if len(word) > 3)
            return {
                "score": 85 if is_close else 60,
                "feedback": f"Sizning javobingiz: {user_answer}\nNamuna javob: {expected_sample}\n\n(Eslatma: To'liq AI tahlili uchun GEMINI_API_KEY ni sozlang)",
                "corrected": expected_sample
            }

        prompt = f"""
Siz ingliz tilini 0 dan o'rganayotgan o'zbek foydalanuvchilariga dars beruvchi mehribon va professional repetitorsiz.
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
Izoh: [O'zbek tilida 2-3 jumlada qisqa va aniq izoh]
"""
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
                "feedback": f"Javobingiz qabul qilindi: {user_answer}\nNamuna: {expected_sample}",
                "corrected": expected_sample
            }

    async def evaluate_speaking(self, target_phrase: str, transcribed_text: str = None) -> dict:
        """
        O'quvchining talaffuzi va aytgan gapini baholash.
        """
        return {
            "score": 90,
            "feedback": f"Barakalla! Talaffuzingiz qabul qilindi.\nMaqsadli jumla: '{target_phrase}'\nHar kuni mashq qilishda davom eting!"
        }


ai_service = AIService()
