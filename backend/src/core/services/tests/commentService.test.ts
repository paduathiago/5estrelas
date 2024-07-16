import { CommentService } from '../commentService';

export const commentService = new CommentService();

test('Comment created returns the correct comment', async () => {
    const commentCreated = await commentService.createComment('1000', 'test-comment');
    expect(commentCreated.comment).toBe('test-comment');
})

test('Inserting random id doesnt return a comment', async () => {
    const commentCreated = await commentService.getComment('randomId');
    expect(commentCreated).toBe(undefined);
})

test('Getting comments by review', async () => {
    const comments = await commentService.getCommentsByReview('1000');
    expect(comments[0].reviewId).toBe('1000');
})