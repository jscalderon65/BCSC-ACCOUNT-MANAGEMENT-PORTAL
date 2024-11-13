import forge from "node-forge";
import { PUBLIC_KEY } from "../constants/appConfig";

export const encryptData = (data: any) => {
  const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY);
  const encrypted = publicKey.encrypt(JSON.stringify(data), "RSA-OAEP");
  return forge.util.encode64(encrypted);
};
