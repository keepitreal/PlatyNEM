/// <reference path="../../references.d.ts" />

import path = require('path');

var config: models.IConfig = {
    app: {
        name: 'Capsize',
        url: 'http://localhost',
        dist: './client/dist/',
        uploads: '/assets'
    },
    db: {
        host: '127.0.0.1',
        user: '3l33t',
        password: 'uw0tm8',
        dbName: 'capsize',
        connectionLimit: 2
    },
    smtp: {
        service: 'Gmail',
        username: 'johndoe@johndoe.com',
        password: 'password123'
    },
    sessionKey: 'You should change this',
    port: 5000,
    root: path.normalize(__dirname + '../../../..')
};

export = config;
