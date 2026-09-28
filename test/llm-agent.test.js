import test from "node:test";
import assert from "node:assert/strict";
import { createLLMAgent } from "../src/agents/llm-agent.js";

test("LLM agent parses structured JSON output", async () => {
  const agent = createLLMAgent({
    provider: {
      generate: async () => '{"classification":"qualified","score":91}'
    },
    systemPrompt: "Return JSON only."
  });

  const result = await agent.run({
    workflowId: "lead-1",
    payload: { company: "Example" }
  });

  assert.deepEqual(result, { classification: "qualified", score: 91 });
});

test("LLM agent rejects non-JSON output", async () => {
  const agent = createLLMAgent({
    provider: { generate: async () => "not json" }
  });

  await assert.rejects(
    () => agent.run({ workflowId: "x", payload: {} }),
    /valid JSON/
  );
});
