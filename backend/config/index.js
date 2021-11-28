const dotenv = require("dotenv");
const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find env file");
}

module.exports = {
    ENVIRONMENT: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT),
    DATABASE: {
        name: process.env.DATABASE_NAME,
        uri: process.env.DATABASE_URI,
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASS,
    },
    SESSION: {
        secret: process.env.SESSION_SECRET,
    },
    EMAIL: {
        user: process.env.GMAIL_ID,
        password: process.env.GMAIL_PASSWORD,
    },
    ENCRYPTION: {
        key: process.env.ENCRYPTION_KEY,
        salt: process.env.ENCRYPTION_SALT,
    }
};