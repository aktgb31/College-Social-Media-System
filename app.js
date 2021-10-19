const express = require("express");
const session = require("express-session");
const PORT = require("./config").port;
const SESSION = require("./config").session;
const errorMiddlerware = require("./middlewares/error");
const db = require("./config/database");

db.authenticate()
  .then(() => console.log("Connection to Database established Successfully"))
  .catch((err) => {
    console.log("Unable to connect to Database", err.message);
    process.exit(1)
  });

const app = express();
//app.use(session({ secret: SESSION.secret }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const user = require("./routes/userRoutes")

//Routes
app.use('/user', user);


//Error Middleware int the end
app.use(errorMiddlerware);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Your server is ready !`);
});


