import test from "node:test";
import assert from "node:assert/strict";
import { createAgent } from "../src/agents/agent.js";

test("agent returns structured decisions", async () => {
  const agent = createAgent({
    name: "lead-classifier",
    decide: async (payload) => ({
      category: payload.intent === "sales" ? "qualified" : "review"
    })
  });

  const result = await agent.run({
    workflowId: "lead-1",
    payload: { intent: "sales" }
  });

  assert.deepEqual(result, { category: "qualified" });
});

test("agent rejects unstructured output", async () => {
  const agent = createAgent({
    name: "bad-agent",
    decide: async () => "execute this immediately"
  });

  await assert.rejects(
    () => agent.run({ workflowId: "x", payload: {} }),
    /structured object/
  );
});
