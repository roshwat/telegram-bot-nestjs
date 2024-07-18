import { LoggingMiddlewareMiddleware } from './logging-middleware.middleware';

describe('LoggingMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggingMiddlewareMiddleware()).toBeDefined();
  });
});
