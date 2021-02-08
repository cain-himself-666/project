const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

var sequelize = new Sequelize('postgres://postgres:Darkhorse@1@localhost:5432/auth-system');

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
    hook: {
        beforeCreate: (user) => {
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