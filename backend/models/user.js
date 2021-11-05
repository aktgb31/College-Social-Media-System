const { DataTypes } = require("sequelize");
const Db = require("../config/database");
const { hash } = require("../utils/encrypt");

// Student Model
const Student = Db.define("student", {
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passingYear: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    branch: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
            isIn: [
                ["MALE", "FEMALE"]
            ]
        },
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Club Model
const Club = Db.define("club", {
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clubType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "CLUB",
    },
});

// User Model
const User = Db.define("user", {
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue("password", hash(this.emailId + value));
        },
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [
                ["STUDENT", "CLUB"]
            ],
        },
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});

User.hasOne(Student, {
    foreignKey: "userId",
    targetKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

User.hasOne(Club, {
    foreignKey: "userId",
    targetKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

exports.User = User;
exports.Student = Student;
exports.Club = Club;