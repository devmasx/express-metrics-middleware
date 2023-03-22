/* istanbul ignore file */
import { ICollector, metricsMiddleware } from '../index';

const express = require('express');
const app = express();

function initializeApp(collector: ICollector) {
  app.use(metricsMiddleware(collector));

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

export { initializeApp };
