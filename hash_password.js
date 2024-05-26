const bcrypt = require("bcryptjs");

let pass = "ilovehtml"

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(pass, salt);

console.log(hash, bcrypt.compareSync(pass, hash))