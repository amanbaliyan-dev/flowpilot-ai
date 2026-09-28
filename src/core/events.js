export function createExecutionEvent(type, data = {}) {
  return {
    id: crypto.randomUUID(),
    type,
    timestamp: new Date().toISOString(),
    ...data
  };
}

export function createExecutionRecorder() {
  const events = [];

  return {
    record(event) {
      events.push(event);
      return event;
    },
    all() {
      return [...events];
    }
  };
}
