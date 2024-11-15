const CryptoJS = require('crypto-js');

export function Encrypt(data: any, key = process.env.NEXT_PUBLIC_COOKIE_KEY) {
  let encJson = CryptoJS.AES.encrypt(data, key).toString();
  let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
  return encData;
}

export function Decrypt(data: any, key = process.env.NEXT_PUBLIC_COOKIE_KEY) {
  let decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
  return bytes;
}

const secretKey = 'my_secret_key_32_characters_long'; // Ensure this is secure

// Function to encrypt text (phone number or OTP)
export function encryptOtp(text: any) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Function to decrypt text
export function decryptOtp(cipherText: any) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
