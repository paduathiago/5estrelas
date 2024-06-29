import { Comment } from '../entities';
import { CommentRepositoryInterface } from '../../repositories/interfaces';
import { CommentRepository } from '../../repositories/implementation/CommentRepository';

export class CommentService {
    private commentRepository: CommentRepositoryInterface
    constructor() {
        this.commentRepository = new CommentRepository()
    }

    async createComment(reviewId: string, comment: string): Promise<Comment> {
        const timestamp = new Date();
        const newUser = await this.commentRepository.create({ reviewId, comment, timestamp })
        return newUser
    }

    async getComment(id: string): Promise<Comment | null> {
        const user = await this.commentRepository.get(id)
        return user
    }
}

