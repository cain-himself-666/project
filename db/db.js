const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

// var sequelize = new Sequelize('postgres://postgres:Darkhorse@1@localhost:5432/auth-system');
var sequelize = new Sequelize('postgres://rmqovcfgqgryrq:1c4f705c9b7df195c85cb432dbb3d6fb61b5053ae0da2760979b155879511d50@ec2-18-207-95-219.compute-1.amazonaws.com:5432/dc0djuet1uvnj1');

var User = sequelize.define("users", {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    usertype: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    }
},
{
    hooks: {
        beforeCreate: (user) => {
            console.log(user.password);
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

sequelize.sync()
.then(() => console.log('User Table Created !!!'))
.catch(err => console.log(err));

module.exports = User;