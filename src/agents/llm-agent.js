import { createAgent } from "./agent.js";

export function createLLMAgent({ provider, name = "llm-agent", systemPrompt }) {
  if (!provider || typeof provider.generate !== "function") {
    throw new TypeError("A provider with generate() is required");
  }

  return createAgent({
    name,
    decide: async (payload) => {
      const content = await provider.generate({
        system: systemPrompt,
        user: JSON.stringify(payload)
      });

      try {
        return JSON.parse(content);
      } catch {
        throw new Error("LLM agent expected valid JSON output");
      }
    }
  });
}
