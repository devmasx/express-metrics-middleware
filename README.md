## express-metrics-middleware-exporter

## Usage
```
npm install express-metrics-middleware-exporter
```

```ts
import { ICollector, metricsMiddleware } from 'express-metrics-middleware-exporter';
import express, { Request, Response } from 'express';

const app = express();
const collector: ICollector = {
  // Process metrics data with any type of collector
  onRequestFinish(metricsData: IMetricsData, request: Request, response: Response) {
    console.log(metricsData);
    // {
    //   method: 'GET',
    //   path: '/users/1',
    //   status: '200',
    //   expressRoute: '/users/:id',
    //   timeInMs: 2.489832,
    //   requestContentLength: 0,
    //   responseContentLength: 16,
    // }
  },
};
app.use(metricsMiddleware(collector));
```

