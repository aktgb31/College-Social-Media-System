const { SESSION } = require("./config");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const errorMiddleware = require("./middlewares/error");
const { sessionStore } = require("./models/sessionStore");
const ping = require("./utils/ping");
const user = require("./routes/userRoutes");
const thread = require("./routes/threadRoutes");
const post = require("./routes/postRoutes");
const event = require("./routes/eventRoutes");
const message = require("./routes/messageRoutes");
const path = require("path");

const app = express();

app.use(cors());
app.use(
    session({
        secret: SESSION.secret,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        rolling: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/media", express.static(path.join(__dirname, "uploads")));

//Routes
app.get("/api/ping", ping); // Ping Support
app.use("/api/user", user); // User based services
app.use("/api/thread", thread); // Thread based services
app.use("/api/post", post); // Post based services
app.use("/api/event", event); // Event based services
app.use("/api/message", message); // Message based services

//Error Middleware in the end
app.use(errorMiddleware);

module.exports = app;