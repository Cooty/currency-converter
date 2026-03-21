import CryptoJS from 'crypto-js'

export async function signCanonicalString(secret: string, canonical: string) {
  return CryptoJS.HmacSHA256(canonical, secret).toString(CryptoJS.enc.Base64)
}
