import { TypeOf, object, string } from 'zod';

enum CatrgoryEnumType {
  UI = 'UI',
  UX = 'UX',
  Enhancement = 'Enhancement',
  Bug = 'Bug',
  Feature = 'Feature',
}

export const createFeedbackSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    detail: string({
      required_error: 'Detail is required',
    }),
    category: string({
      required_error: 'Category is required',
    }),
  }),
});

export type createFeedbackInput = TypeOf<typeof createFeedbackSchema>['body'];
