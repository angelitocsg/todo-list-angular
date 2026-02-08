export function jsonCastTo<T>(content: any) {
  return JSON.parse(JSON.stringify(content)) as T;
}
