require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import prisma from './libs/prisma';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import feedbackRouter from './routes/feedback.routes';
import categoryRouter from './routes/category.routes';
import statusRouter from './routes/status.routes';
import upvoteRouter from './routes/upvote.routes';
import commentRouter from './routes/comment.routes';
import AppError from './utils/appError';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = express();

async function bootstrap() {
  // TEMPLATE ENGINE
  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/views`);

  // MIDDLEWARE

  // Body Parser
  app.use(express.json({ limit: '10kb' }));

  // Cookie Parser
  app.use(cookieParser());

  // Cors
  app.use(
    cors({
      origin: [config.get<string>('origin')],
      credentials: true,
    })
  );

  // logger
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // ROUTES
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/feedback', feedbackRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/upvote', upvoteRouter);
  app.use('/api/status', statusRouter);
  app.use('/api/comment', commentRouter);

  // Testing
  app.get('/api/healthchecker', (_, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to Feedback App',
    });
  });

  // UNHANDLED ROUTES
  app.all(
    '*',
    (error: AppError, _req: Request, res: Response, next: NextFunction) => {
      error.status = error.status || 'error';
      error.statusCode = error.statusCode || 500;

      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
  );

  const port = config.get<number>('port');
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

bootstrap()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
