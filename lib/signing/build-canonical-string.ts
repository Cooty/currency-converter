export function normalizeQuery(params: URLSearchParams) {
  return [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')
}

export function buildCanonicalString(input: {
  method: string
  path: string
  query: string
  timestamp: string
  bodyHash?: string
}) {
  return [
    input.method.toUpperCase(),
    input.path,
    input.query,
    input.timestamp,
    input.bodyHash ?? '',
  ].join('\n')
}
