import { assertWorkflowInput } from "../core/validate.js";

export function createAgent({ name, decide }) {
  if (!name || typeof name !== "string") throw new TypeError("Agent name is required");
  if (typeof decide !== "function") throw new TypeError("Agent decide function is required");

  return {
    name,
    async run(input) {
      assertWorkflowInput(input);
      const decision = await decide(input.payload);

      if (!decision || typeof decision !== "object" || Array.isArray(decision)) {
        throw new TypeError("Agent must return a structured object");
      }

      return decision;
    }
  };
}
