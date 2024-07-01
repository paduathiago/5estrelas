import express from 'express';
import userController from './controllers/userController';
import establishmentController from './controllers/establishmentController';
import reviewController from './controllers/reviewController';
import reviewFeedbackController from './controllers/reviewFeedbackController';
import commentController from './controllers/commentController';
const bodyParser = require("body-parser");

const cors = require('cors');

export class ExpressServer {
  run(): void {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.json());

    app.use('/user', userController);
    app.use('/establishments', establishmentController);
    app.use('/review', reviewController);
    app.use('/reviewFeedback', reviewFeedbackController);
    app.use('/comment', commentController);

    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}


