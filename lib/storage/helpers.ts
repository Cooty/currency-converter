export function safeJSONParse(value: string) {
  try {
    return JSON.parse(value) as unknown
  } catch {
    return value as unknown
  }
}

export function makeErrorMessage(e: unknown, key: string) {
  return `[error]: ${e instanceof Error ? e.message : `Unknown error: ${String(e)}`}, value of key was ${key}`
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
