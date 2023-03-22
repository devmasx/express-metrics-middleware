## express-metrics-middleware

## Usage
```
npm install express-metrics-middleware
```

```ts
import { ICollector, metricsMiddleware } from 'express-metrics-middleware';
import express, { Request, Response } from 'express';

const app = express();
const collector: ICollector = {
  // Process metrics data with any type of collector
  onRequestFinish(metricsData: IMetricsData, request: Request, response: Response) {
    console.log(metricsData);
    // {
    //   method: 'GET',
    //   route: '/users/:id',
    //   status: '200',
    //   requestContentLength: 0,
    //   responseContentLength: 16,
    //   timeInMs: 2.489832,
    // }
  },
};
app.use(metricsMiddleware(collector));
```

