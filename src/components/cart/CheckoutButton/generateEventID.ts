export function generateEventID(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}
