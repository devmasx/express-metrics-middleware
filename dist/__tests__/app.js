"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = void 0;
const index_1 = require("../index");
const express = require('express');
const app = express();
function initializeApp(collector) {
    app.use((0, index_1.metricsMiddleware)(collector));
    app.post('/users', (req, res) => {
        res.json({ status: 'processing' });
    });
    app.get('/users/:id', (req, res) => {
        res.json({ success: true });
    });
    app.get('/error', (req, res) => {
        res.status(500);
        res.json({ error: true });
    });
    return app;
}
exports.initializeApp = initializeApp;
