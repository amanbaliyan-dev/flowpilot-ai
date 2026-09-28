import test from "node:test";
import assert from "node:assert/strict";
import { createOpenRouterProvider } from "../src/providers/openrouter.js";

test("provider requires an API key", () => {
  assert.throws(
    () => createOpenRouterProvider({ apiKey: "" }),
    /OPENROUTER_API_KEY/
  );
});

test("provider sends a chat completion request", async () => {
  let request;

  const provider = createOpenRouterProvider({
    apiKey: "test-key",
    model: "test/model",
    fetchImpl: async (url, options) => {
      request = { url, options };
      return {
        ok: true,
        async json() {
          return { choices: [{ message: { content: "structured answer" } }] };
        }
      };
    }
  });

  const result = await provider.generate({
    system: "You are a workflow agent.",
    user: "Classify this lead."
  });

  assert.equal(result, "structured answer");
  assert.equal(request.options.headers.Authorization, "Bearer test-key");
  assert.equal(JSON.parse(request.options.body).model, "test/model");
});

test("provider surfaces upstream failures", async () => {
  const provider = createOpenRouterProvider({
    apiKey: "test-key",
    fetchImpl: async () => ({
      ok: false,
      status: 429,
      async text() { return "rate limited"; }
    })
  });

  await assert.rejects(
    () => provider.generate({ user: "hello" }),
    /429/
  );
});
