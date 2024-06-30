import express from 'express';
import userController from './controllers/userController';
import establishmentController from './controllers/establishmentController';
import reviewController from './controllers/reviewController';
import commentController from './controllers/commentController';
import reviewFeedbackController from './controllers/reviewFeedbackController';


export class ExpressServer {
  run(): void {
    const app = express();
    app.use(express.json());

    app.use('/user', userController);
    app.use('/establishment', establishmentController);
    app.use('/review', reviewController);
    app.use('/comment', commentController);
    app.use('/reviewFeedback', reviewFeedbackController);

    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}


