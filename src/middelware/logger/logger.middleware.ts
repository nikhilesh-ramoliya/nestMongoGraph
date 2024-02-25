import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log({
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body,
    });
    next();
  }
}
