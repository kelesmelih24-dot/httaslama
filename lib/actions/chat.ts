"use server";

import { callGroq, type ChatMessage } from "@/lib/groq";
import { getServices, getSiteSettings, getHoursSettings, getFaqs } from "@/lib/data";

type ChatResult = { ok: true; reply: string } | { ok: false; error: string };

const MAX_HISTORY_MESSAGES = 12; // maliyet/kötüye kullanım kontrolü için sohbet geçmişi sınırlı tutulur
const MAX_MESSAGE_LENGTH = 800;

async function buildSystemPrompt(): Promise<string> {
  const [services, settings, hours, faqs] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getHoursSettings(),
    getFaqs(),
  ]);

  const serviceList = services.map((s) => `- ${s.title}: ${s.summary}`).join("\n");
  const faqList = faqs.map((f) => `S: ${f.question}\nC: ${f.answer}`).join("\n\n");

  return `Sen HT Makina Taşlama adlı hassas metal taşlama atölyesinin web sitesindeki yapay zeka asistanısın.
Görevin: ziyaretçilerin hizmetler, çalışma saatleri, iletişim ve süreç hakkındaki sorularını kısa, net ve güler yüzlü şekilde yanıtlamak.

KURALLAR:
- Her zaman Türkçe yanıt ver.
- Türkçe yazım ve dil bilgisi kurallarına kesinlikle dikkat et: doğru ekler
  (büyük/küçük ünlü uyumu, -de/-da, -ki, -mi soru eki gibi) kullan, harf
  hatası veya eksik/yanlış harf yapma. Yanıtı göndermeden önce zihninde
  yazım hatası olup olmadığını kontrol et.
- Yanıtların kısa olsun (en fazla 3-4 cümle), gereksiz uzatma.
- KESİN FİYAT VERME. Fiyat sorulursa, parça ölçüsü/malzeme/adete göre değiştiğini söyle ve teklif formunu doldurmasını veya ${settings.phone} numarasından aramasını öner.
- Kesin teslim tarihi verme, "teklif sırasında netleşir" de.
- İşletmeyle alakasız konularda (genel sohbet, kod yazma, alakasız bilgi vb.) kibarca konunun dışında olduğunu belirt ve taşlama hizmetleriyle ilgili nasıl yardımcı olabileceğini sor.
- Emin olmadığın bir konuda uydurma bilgi verme; bilmediğini söyle ve iletişim bilgilerini paylaş.

İŞLETME BİLGİLERİ:
Telefon: ${settings.phone}
E-posta: ${settings.email}
Adres: ${settings.address}
Çalışma saatleri: Pazartesi - Cumartesi ${hours.hafta_ici_cumartesi}, Pazar: ${hours.pazar}

HİZMETLER:
${serviceList}

SIK SORULAN SORULAR:
${faqList}`;
}

export async function sendChatMessage(
  history: ChatMessage[],
  userMessage: string
): Promise<ChatResult> {
  const trimmed = userMessage.trim();
  if (!trimmed) return { ok: false, error: "Boş mesaj gönderilemez." };
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: "Mesajınız çok uzun, lütfen kısaltın." };
  }

  // Maliyet/kötüye kullanım koruması: gönderilen geçmiş sınırlı tutulur
  const boundedHistory = history.slice(-MAX_HISTORY_MESSAGES);

  try {
    const systemPrompt = await buildSystemPrompt();
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...boundedHistory,
      { role: "user", content: trimmed },
    ];
    const reply = await callGroq(messages);
    return { ok: true, reply };
  } catch (err: any) {
    return { ok: false, error: err.message || "Bir hata oluştu, tekrar deneyin." };
  }
}
