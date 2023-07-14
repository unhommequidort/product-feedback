import { TypeOf, object, string } from 'zod';

export const createCommentSchema = object({
  body: object({
    body: string({
      required_error: 'Reply is required',
    }),
    feedbackId: string({
      required_error: 'Feedback ID is required',
    }),
    parentId: string().optional(),
  }),
});

export type createCommentInput = TypeOf<typeof createCommentSchema>['body'];
