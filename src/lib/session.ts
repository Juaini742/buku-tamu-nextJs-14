const SECRET = process.env.NEXTAUTH_SECRET;

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decrypt(
  encryptedData: string | undefined
): Promise<unknown | null> {
  if (!encryptedData) return null;

  const [ivBase64, contentBase64] = encryptedData.split(":");
  const iv = base64ToUint8Array(ivBase64);
  const content = base64ToUint8Array(contentBase64);

  if (!SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined");
  }

  // Create a key from the SECRET
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(SECRET),
      iterations: 1000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-CBC", length: 256 },
    true,
    ["decrypt"]
  );

  try {
    const decryptedContent = await crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv: iv,
      },
      key,
      content
    );

    return JSON.parse(new TextDecoder().decode(decryptedContent));
  } catch (error) {
    console.error("Error parsing decrypted session:", error);
    return null;
  }
}
