import test from "node:test";
import assert from "node:assert/strict";
import { withRetry } from "../src/core/retry.js";
import { createExecutionEvent, createExecutionRecorder } from "../src/core/events.js";
import { createToolRegistry } from "../src/tools/registry.js";

test("retry succeeds after transient failures", async () => {
  let attempts = 0;

  const result = await withRetry(async () => {
    attempts += 1;
    if (attempts < 3) throw new Error("temporary");
    return "ok";
  }, { retries: 3, baseDelayMs: 0 });

  assert.equal(result, "ok");
  assert.equal(attempts, 3);
});

test("retry stops at configured limit", async () => {
  let attempts = 0;

  await assert.rejects(
    () => withRetry(async () => {
      attempts += 1;
      throw new Error("permanent");
    }, { retries: 2, baseDelayMs: 0 }),
    /permanent/
  );

  assert.equal(attempts, 3);
});

test("execution recorder preserves event history", () => {
  const recorder = createExecutionRecorder();
  const event = createExecutionEvent("workflow.started", { workflowId: "demo" });

  recorder.record(event);

  assert.equal(recorder.all().length, 1);
  assert.equal(recorder.all()[0].type, "workflow.started");
});

test("tool registry prevents duplicate tools and executes registered tools", async () => {
  const registry = createToolRegistry();

  registry.register({
    name: "normalize-lead",
    description: "Normalize lead data",
    execute: async (input) => ({ ...input, normalized: true })
  });

  assert.deepEqual(
    await registry.execute("normalize-lead", { email: "USER@EXAMPLE.COM" }),
    { email: "USER@EXAMPLE.COM", normalized: true }
  );

  assert.throws(
    () => registry.register({ name: "normalize-lead", execute: async () => ({}) }),
    /already registered/
  );
});
