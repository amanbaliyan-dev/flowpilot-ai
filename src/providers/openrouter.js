const DEFAULT_BASE_URL = "https://openrouter.ai/api/v1";

export function createOpenRouterProvider({
  apiKey = process.env.OPENROUTER_API_KEY,
  model = "openai/gpt-4o-mini",
  baseUrl = DEFAULT_BASE_URL,
  fetchImpl = fetch
} = {}) {
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is required");

  return {
    name: "openrouter",
    model,

    async generate({ system, user, temperature = 0 }) {
      const response = await fetchImpl(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          temperature,
          messages: [
            ...(system ? [{ role: "system", content: system }] : []),
            { role: "user", content: user }
          ]
        })
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`OpenRouter request failed (${response.status}): ${detail.slice(0, 500)}`);
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;

      if (typeof content !== "string" || !content.trim()) {
        throw new Error("OpenRouter returned an empty response");
      }

      return content;
    }
  };
}
