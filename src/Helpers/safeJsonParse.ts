// Utility to safely parse JSON strings from metafields
function safeJsonParse<T>(
  jsonString: string | null | undefined,
  fallback: T | null
): T | null {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    return fallback;
  }
}

export default safeJsonParse;
