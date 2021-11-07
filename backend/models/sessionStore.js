// const session = require("express-session");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const Db = require("../config/database");

// const sessionStore = new SequelizeStore({
//     db: Db,
//     checkExpirationInterval: 15 * 60 * 1000, // After 15 mins
//     expiration: 1 * 60 * 60 * 1000, // 1hour
// });
// module.exports = sessionStore;

const session = require("express-session");
const { DataTypes } = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const Db = require("../config/database");

const Session = Db.define("session", {
    sid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,

});

function extendDefaultFields(defaults, session) {
    return { data: defaults.data, expires: defaults.expires, userId: session.userId, userType: session.userType };
}
const sessionStore = new SequelizeStore({
    db: Db,
    checkExpirationInterval: 15 * 60 * 1000, // After 15 mins
    expiration: 1 * 60 * 60 * 1000, // 1hour
    table: "session",
    extendDefaultFields: extendDefaultFields
});
exports.sessionStore = sessionStore;
exports.Session = Session;