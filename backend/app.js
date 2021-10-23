const PORT = require("./config").port;
const SESSION = require("./config").session;
const express = require("express");
const session = require("express-session");
const errorMiddleware = require("./middlewares/error");
const Db = require("./config/database");
const sessionStore = require("./models/sessionStore");
const ping = require("./utils/ping");

const app = express();

app.use(
  session({
    secret: SESSION.secret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    rolling: true,
  })
);
sessionStore.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = require("./routes/userRoutes");

//Routes
app.get("/api/ping", ping); // Ping Support
app.use("/api/user", user); // User based services

//Error Middleware in the end
app.use(errorMiddleware);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Your server is ready !`);
});
