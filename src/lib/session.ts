import 'server-only';
import { cookies } from 'next/headers';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';
import { sessionSchema } from '@/lib/sessionSchema';
import { cache } from 'react';

const algorithm = 'aes-256-cbc';
const salt: string = 'FIcWDXjEtL03RmxSfRFvEHnj5cTwxZAbJluK9lrErXTttT9kDJkS8VM1hQjiJKB';
const key = scryptSync(process.env.VERCEL_ANALYTICS_ID + salt, salt, 32);
const cookieName = 'bwh-session';

async function getSession_internal() {
  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get(cookieName)?.value;
  const session = encryptedSession ? decryptSession(encryptedSession) : null;
  return session == null ? null : sessionSchema.parse(session);
}
export const getSession = cache(getSession_internal);

function encryptSession(session: string) {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(JSON.stringify(session), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

function decryptSession(encrypted: string) {
  try {
    const [ivHex, encryptedData] = encrypted.split(':');
    const decipher = createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function saveSession(session: any) {
  const cookieStore = await cookies();
  if (session == null) {
    cookieStore.delete(cookieName);
  } else {
    cookieStore.set(cookieName, encryptSession(session));
  }
}