/** @typedef {"queued"|"running"|"completed"|"failed"} WorkflowStatus */

/**
 * @typedef {Object} WorkflowInput
 * @property {string} workflowId
 * @property {Record<string, unknown>} payload
 */

/**
 * @typedef {Object} WorkflowResult
 * @property {string} workflowId
 * @property {WorkflowStatus} status
 * @property {Record<string, unknown>=} output
 * @property {string=} error
 */

/**
 * @typedef {Object} WorkflowStep
 * @property {string} id
 * @property {(payload: Record<string, unknown>) => Promise<Record<string, unknown>>} run
 */
