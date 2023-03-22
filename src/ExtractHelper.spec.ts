import { ExtractHelper } from './ExtractHelper';

const extractHelper = new ExtractHelper();
describe('ExtractHelper', () => {
  describe('.statusCode', () => {
    it('', () => {
      const request = { statusCode: 200 };
      expect(extractHelper.statusCode(null, request)).toEqual('200');
    });
  });

  describe('.route', () => {
    it('with express app request', () => {
      const request = { route: { path: '/users/:id' } };
      expect(extractHelper.route(request)).toEqual('/users/:id');
    });

    it('without express app request', () => {
      const request = { originalUrl: 'http://localhost/users' };
      expect(extractHelper.route(request)).toEqual('/users');
    });
  });

  describe('.routeWithMark', () => {
    [
      ['http://localhost/users', '/users'],
      ['http://localhost/users/1', '/users/:id'],
      ['http://localhost/users/123e4567-e89b-12d3-a456-426614174000', '/users/:id'],
      ['http://localhost/users/1/posts/1', '/users/:id/posts/:id'],
    ].forEach(([input, output]) => {
      it('', () => {
        const request = { originalUrl: input };
        expect(extractHelper.routeWithMark(request)).toEqual(output);
      });
    });
  });
});
