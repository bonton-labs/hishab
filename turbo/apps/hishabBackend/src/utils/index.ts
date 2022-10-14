import bcrypt from "bcrypt";

export async function sendOneTimeCode(code: string) {
  console.log(`The one time code is ${code}`);
}

export async function getHashedText(text: string) {
  const salt = await bcrypt.genSalt(12);
  const hashedText = await bcrypt.hash(text, salt);
  return hashedText;
}

export async function compareHashWithText(text: string, hashedText: string) {
  const match = await bcrypt.compare(text, hashedText);
  return match;
}
