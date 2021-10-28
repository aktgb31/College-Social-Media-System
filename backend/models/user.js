const { DataTypes } = require("sequelize");
const Db = require("../config/database");
const { hash } = require("../utils/encrypt");
const ErrorHandler = require("../utils/errorHandler");

// Student Model
const Student = Db.define(
  "student",
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("firstName", value.toUpperCase());
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("lastName", value.toUpperCase());
      },
    },
    passingYear: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("branch", value.toUpperCase());
      },
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { isDate: true },
    },
    gender: {
      type: DataTypes.STRING(6),
      allowNull: true,
      set(value) {
        this.setDataValue("gender", value.toUpperCase());
      },
      validate: {
        genderValidate(value) {
          if (value && value != "MALE" && value != "FEMALE")
            throw new ErrorHandler("Invalid gender", 406);
        },
      },
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeValidate: (student) => {
        if (!student.profilePic) {
          if (student.gender == "MALE") student.profilePic = "MALE";
          else if (student.gender == "FEMALE") student.profilePic = "FEMALE";
          else student.profilePic = "NULL";
        }
      },
    },
  }
);

// Club Model
const Club = Db.define("club", {
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("name", value.toUpperCase());
    },
  },
  clubType: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("clubType", value.toUpperCase());
    },
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
    validate: {
      isEmail: true,
      isNitcEmail(value) {
        if (value.slice(-11) != "@nitc.ac.in") {
          throw new ErrorHandler("Only nitc emails are allowed", 406);
        }
      },
    },
    set(value) {
      this.setDataValue("emailId", value.toLowerCase());
    },
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
    set(value) {
      this.setDataValue("userType", value.toUpperCase());
    },
    validate: {
      isIn: [["STUDENT", "CLUB"]],
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
