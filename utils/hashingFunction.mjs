/**
 * Generates a random hash string based on the specified number of bytes and encoding type.
 *
 * @param {number} [NumberOfBytes=10] - The number of random bytes to generate. Higher values increase the length of the output.
 * @param {string} [hashType="hex"] - The encoding type for the output string. Common options are "hex", "base64", etc.
 * @returns {string} - The generated random hash string.
 */
import crypto from "crypto";
export const randHashGenerator = function (
  NumberOfBytes = 3,
  hashType = "hex"
) {
  return crypto.randomBytes(NumberOfBytes).toString(hashType);
};
