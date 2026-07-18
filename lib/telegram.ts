/**
 * Telegram Bot API üzerinden bildirim gönderir.
 * TELEGRAM_BOT_TOKEN ve TELEGRAM_CHAT_ID ortam değişkenleri tanımlı değilse
 * sessizce atlar (site çalışmaya devam eder, sadece bildirim gitmez).
 */
export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "Telegram bildirimi atlandı: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID tanımlı değil."
    );
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("Telegram gönderim hatası:", body);
    }
  } catch (err) {
    console.error("Telegram gönderim hatası:", err);
  }
}
