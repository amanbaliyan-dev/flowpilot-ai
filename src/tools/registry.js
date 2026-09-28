export function createToolRegistry() {
  const tools = new Map();

  return {
    register(tool) {
      if (!tool || typeof tool.name !== "string" || !tool.name.trim()) {
        throw new TypeError("Tool name is required");
      }
      if (typeof tool.execute !== "function") {
        throw new TypeError("Tool execute function is required");
      }
      if (tools.has(tool.name)) {
        throw new Error(`Tool "${tool.name}" is already registered`);
      }
      tools.set(tool.name, tool);
      return tool;
    },

    get(name) {
      return tools.get(name);
    },

    list() {
      return [...tools.values()].map(({ name, description }) => ({ name, description }));
    },

    async execute(name, input) {
      const tool = tools.get(name);
      if (!tool) throw new Error(`Tool "${name}" is not registered`);
      return tool.execute(input);
    }
  };
}
