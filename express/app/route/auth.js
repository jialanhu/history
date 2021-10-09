const express = require('express');
const authController = require('./../controller/auth.js');
const utils = require('./../../util/utils.js');

const routes = [
    {method: 'post', url: '/v1/login', callback: authController.login},
];



module.exports = utils.routerHelper(express.Router(), routes, {prefix: '/api/example/auth'});