const express = require('express')
const path = require('path')

module.exports = function (app) {
    app.use('/src', express.static(path.join(__dirname, './src')))
    app.use('/lib', express.static(path.join(__dirname, './lib')))
}