import express from 'express';
import userController from './controllers/userController';

export class ExpressServer {
  run(): void {
    const app = express();
    app.use(express.json());

    app.use('/user', userController);

    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}


