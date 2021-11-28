const crypto = require("crypto");
const { ENCRYPTION } = require("../config");
const key = crypto.scryptSync(ENCRYPTION.key, ENCRYPTION.salt, 32);

const hash = (pwd) => { return crypto.createHash("sha256").update(pwd).digest("base64") };

const encrypt = (clearText) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encrypted = cipher.update(clearText, "utf8", "hex");
    return [encrypted + cipher.final("hex"), Buffer.from(iv).toString("hex"), ].join("|");
};

const decrypt = (encryptedText) => {
    const [encrypted, iv] = encryptedText.split("|");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));
    return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
};


module.exports = { hash, encrypt, decrypt }