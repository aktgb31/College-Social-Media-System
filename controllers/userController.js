const { user } = require("../models/user");
const { db } = require("../loaders/connectDb")

const registerUser = async (req, res) => {
    const userDetails = req.body;
    console.log(userDetails)
    try {
        await db.sync();
        await user.create(userDetails);
        console.log("Data  Inserted")
        res.send("Succesfull");
    } catch (e) {
        console.error(e);
    }
};

module.exports = { registerUser }