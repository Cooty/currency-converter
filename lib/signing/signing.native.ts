import CryptoJS from 'crypto-js'

export function hmacSha256Base64(secret: string, message: string): string {
  return CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Base64)
}

export function sha256Hex(message: string): string {
  return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex)
}

export async function signCanonicalString(
  secret: string,
  canonical: string
): Promise<string> {
  return CryptoJS.HmacSHA256(canonical, secret).toString(CryptoJS.enc.Base64)
}
