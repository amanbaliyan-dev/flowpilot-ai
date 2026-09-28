export type WorkflowStatus = "queued" | "running" | "completed" | "failed";

export interface WorkflowInput {
  workflowId: string;
  payload: Record<string, unknown>;
}

export interface WorkflowResult {
  workflowId: string;
  status: WorkflowStatus;
  output?: Record<string, unknown>;
  error?: string;
}
