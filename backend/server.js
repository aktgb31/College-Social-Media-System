const { PORT, ENVIRONMENT } = require("./config");
const app = require("./app");
const Db = require("./config/database");
const { emailService } = require("./utils/sendEmail");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

Db.authenticate()
    .then(async() => {
        console.log("Connection to Database established Successfully");
        await Db.sync();
    })
    .then(() => console.log("Models Synced"))
    .catch((err) => {
        console.log("Unable to connect to Database", err.message);
        process.exit(1);
    });

if (ENVIRONMENT != "development")
    emailService
    .verify()
    .then((success) => console.log("Email Service Started Successfully"))
    .catch((err) => {
        console.log("Failed to Start Email Service. Error:", err.message);
        process.exit(1);
    });

const server = app.listen(PORT, (err) => {
    if (err) {
        console.log("Failed to Start Server", err.message);
        return;
    }
    console.log(`Server is working on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});