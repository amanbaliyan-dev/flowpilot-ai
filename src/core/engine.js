import { assertWorkflowInput } from "./validate.js";

/**
 * Execute deterministic workflow steps in order.
 * AI components can be inserted as steps, but their output must still
 * pass through the same execution boundary.
 */
export async function executeWorkflow(input, steps) {
  assertWorkflowInput(input);

  if (!Array.isArray(steps) || steps.length === 0) {
    throw new Error("A workflow requires at least one step");
  }

  const startedAt = new Date().toISOString();
  let payload = { ...input.payload };

  try {
    for (const step of steps) {
      if (!step || typeof step.id !== "string" || typeof step.run !== "function") {
        throw new TypeError("Invalid workflow step");
      }

      const result = await step.run(payload);

      if (!result || typeof result !== "object" || Array.isArray(result)) {
        throw new TypeError(`Step "${step.id}" must return an object`);
      }

      payload = { ...payload, ...result };
    }

    return {
      workflowId: input.workflowId,
      status: "completed",
      output: payload,
      startedAt,
      completedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      workflowId: input.workflowId,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown workflow error",
      startedAt,
      completedAt: new Date().toISOString()
    };
  }
}
