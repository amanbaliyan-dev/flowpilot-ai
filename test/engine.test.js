import test from "node:test";
import assert from "node:assert/strict";
import { executeWorkflow } from "../src/core/engine.js";
import { assertWorkflowInput, validateWorkflowInput } from "../src/core/validate.js";

test("validates workflow input", () => {
  assert.equal(validateWorkflowInput({
    workflowId: "lead-qualification",
    payload: { email: "user@example.com" }
  }), true);

  assert.equal(validateWorkflowInput({
    workflowId: "",
    payload: {}
  }), false);
});

test("executes workflow steps in order", async () => {
  const result = await executeWorkflow(
    { workflowId: "demo", payload: { value: 2 } },
    [
      { id: "double", run: async (payload) => ({ value: payload.value * 2 }) },
      { id: "label", run: async (payload) => ({ label: `value=${payload.value}` }) }
    ]
  );

  assert.equal(result.status, "completed");
  assert.deepEqual(result.output, { value: 4, label: "value=4" });
});

test("returns a failed result when a step throws", async () => {
  const result = await executeWorkflow(
    { workflowId: "failure", payload: {} },
    [{ id: "broken", run: async () => { throw new Error("provider timeout"); } }]
  );

  assert.equal(result.status, "failed");
  assert.equal(result.error, "provider timeout");
});

test("rejects empty workflows", async () => {
  await assert.rejects(
    () => executeWorkflow({ workflowId: "empty", payload: {} }, []),
    /at least one step/
  );
});

test("assertWorkflowInput throws on invalid input", () => {
  assert.throws(() => assertWorkflowInput(null), /Invalid workflow input/);
});
