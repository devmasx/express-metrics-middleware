import { ICollector, IMetricsData } from '../../index';
import { initializeApp } from '../app';

const { objectContaining } = expect;

const request = require('supertest');

const collector: ICollector = {
  onRequestFinish(metricsData: IMetricsData, request?: any, response?: any) {
    console.log('send metrics', metricsData);
  },
};
const app = initializeApp(collector);

describe('GET /users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('express path dynamic id ', async () => {
    const spy = jest.spyOn(collector, 'onRequestFinish');
    await request(app).get('/users/1').set('Accept', 'application/json');

    expect(spy).toHaveBeenCalledWith(
      objectContaining({
        // time: expect.any,
        method: 'GET',
        path: '/users/1',
        status: '200',
        expressRoute: '/users/:id',
        requestContentLength: 0,
        responseContentLength: 16,
      }),
      objectContaining({ _consuming: false }),
      objectContaining({ _last: true }),
    );
  });

  it('when return 500 error', async () => {
    const spy = jest.spyOn(collector, 'onRequestFinish');
    await request(app).get('/error').set('Accept', 'application/json');

    expect(spy).toHaveBeenCalledWith(
      objectContaining({
        // time: expect.any,
        method: 'GET',
        path: '/error',
        expressRoute: '/error',
        status: '500',
      }),
      objectContaining({ _consuming: false }),
      objectContaining({ _last: true }),
    );
  });
});
