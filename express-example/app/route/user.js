const express = require('express');
const userController = require('./../controller/user.js');
const utils = require('./../../util/utils.js');

const routes = [
    {method: 'put', url: '/v1/change_password', callback: userController.changePassword},
];



module.exports = utils.routerHelper(express.Router(), routes, {prefix: '/api/example/user'});