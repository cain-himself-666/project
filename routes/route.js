const express = require('express');
const route = express.Router();
const authController = require('../auth/authRoutes');
const { userAuth } = require('../auth/authUser');
const { ROLE } = require('../auth/role');
const {sessionValidator,sessionInvalidator} = require('../session/sessionHandler');

const valid = (req,res,next) => {
    sessionValidator(req,res,next);
}

const invalid = (req,res,next) => {
    sessionInvalidator(req,res,next);
}

route.get('/', valid, authController.hpage); //valid
route.get('/login', valid, authController.login); //valid
route.get('/sdash', invalid, userAuth(ROLE.STUDENT), authController.sdash); //invalid
route.get('/register', authController.registration);
route.get('/tdash', invalid, userAuth(ROLE.TEACHER), authController.tdash); //invalid
route.post('/auth/login', authController.loginAuth);
route.post('/auth/signup', authController.signup);
route.post('/room', authController.roomCreation);
route.get('/:room', authController.room);
route.post('/logout', authController.logout);

module.exports = route;