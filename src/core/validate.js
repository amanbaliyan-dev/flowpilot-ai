export function validateWorkflowInput(input) {
  if (!input || typeof input !== "object") return false;
  const value = input;
  return (
    typeof value.workflowId === "string" &&
    value.workflowId.trim().length > 0 &&
    typeof value.payload === "object" &&
    value.payload !== null &&
    !Array.isArray(value.payload)
  );
}

export function assertWorkflowInput(input) {
  if (!validateWorkflowInput(input)) {
    throw new TypeError("Invalid workflow input");
  }
  return input;
}
