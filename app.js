const express = require("express");
const bodyParser = require("body-parser");
const PORT = require("./config").port;

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/userRoutes")

app.use('/user', user);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Your server is ready !`);
});


