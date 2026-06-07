export function formatPhoneNumber(phone: number): string {
  const phoneStr = phone.toString()

  const country = phoneStr[0]
  const code = phoneStr.slice(1, 4)
  const part1 = phoneStr.slice(4, 7)
  const part2 = phoneStr.slice(7, 9)
  const part3 = phoneStr.slice(9, 11)

  return `+${country} (${code}) ${part1}-${part2}-${part3}`
}

export function formatTelegram(nickname: string): string {
  return `@${nickname}`
}
