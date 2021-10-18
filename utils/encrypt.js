var Cryptr = require("cryptr");
cryptr = new Cryptr("glang");

var encstring = cryptr.encrypt("Hey Gopal");
var decstring = cryptr.decrypt(encstring);

console.log(encstring);
console.log(decstring);

//////

const crypto = require("crypto");
const fs = require("fs");
const algorithm = "aes-256-ctr";
let key = "MysecretKey";
key = crypto
    .createHash("sha256")
    .update(String(key))
    .digest("base64")
    .substr(0, 32);

//encrypt function
const encrypt = (buffer) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createDecipheriv(algorithm, key, iv);
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
};

//decrypt function
const decrypt = (encrypted) => {
    const iv = encrypted.slice(0, 16);
    encrypted = encrypted.slice(16);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return result;
};

fs.readFile("./6.JPG", (err, file) => {
    if (err) return console.error(err.message);
    const encyrptedFile = encrypt(file);

    fs.writeFile("./cipher_file.txt", encyrptedFile, (err, file) => {
        if (file) {
            console.log("File encrypted Successfully");
        }
    });
});



/////////email validation
var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
    //check if it is nitcid
    function isnitcid(email) {
        lastpart = email.slice(-11);
        if (lastpart == "@nitc.ac.in") {
            return true;
        } else {
            return false;
        }
    }

    if (!email) return false;

    if (email.length > 254) return false;

    var valid = emailRegex.test(email);
    if (!valid) return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64) return false;

    var domainParts = parts[1].split(".");
    if (
        domainParts.some(function (part) {
            return part.length > 63;
        })
    )
        return false;
    if (isnitcid(email)) {
        return true;
    }
    return false;
}


//dob validation 