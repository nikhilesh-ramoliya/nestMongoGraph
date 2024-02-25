import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const [req, res]: [Request, Response] = host.getArgs();
    // const status = exception.getStatus();

    // res.status(status).json({
    //   message: exception.message,
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: req.url,
    //   method: req.method,
    //   error: exception.name,
    // });
    // console.log({ exception, args: host.getArgs() });
    // res.json({ error: exception });
  }
}
