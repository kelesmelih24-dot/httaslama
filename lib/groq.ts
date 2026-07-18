/**
 * Groq API (Llama 3.3 70B) ile konuşma tamamlama isteği gönderir.
 * API anahtarı sadece sunucu tarafında kullanılır, tarayıcıya asla gönderilmez.
 *
 * Groq, OpenAI ile uyumlu bir API sunar (base URL: api.groq.com/openai/v1).
 * Model isimleri zamanla değişebilir; sorun yaşarsanız GROQ_MODEL ortam
 * değişkenini https://console.groq.com/docs/models adresindeki güncel
 * model adıyla değiştirin.
 */

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function callGroq(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY tanımlı değil. Vercel > Settings > Environment Variables kısmına eklemeniz gerekiyor."
    );
  }

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.5,
      max_tokens: 400,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Groq API hatası:", res.status, body);
    throw new Error("Yapay zeka asistanına şu an ulaşılamıyor.");
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error("Yapay zeka asistanından geçerli bir yanıt alınamadı.");
  }
  return reply.trim();
}
