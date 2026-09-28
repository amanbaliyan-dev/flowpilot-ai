import type { WorkflowInput } from "./types";

export function validateWorkflowInput(input: unknown): input is WorkflowInput {
  if (!input || typeof input !== "object") return false;

  const value = input as Partial<WorkflowInput>;

  return (
    typeof value.workflowId === "string" &&
    value.workflowId.trim().length > 0 &&
    typeof value.payload === "object" &&
    value.payload !== null &&
    !Array.isArray(value.payload)
  );
}
