import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddlewareMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`[Request] ${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
      console.log(`[Response] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });
    next();
  }
}
