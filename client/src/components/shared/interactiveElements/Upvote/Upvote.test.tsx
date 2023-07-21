import { render, screen } from '@testing-library/react';

import { Upvote } from './Upvote';

describe('Upvote', () => {
  it('should render successfully', () => {
    render(<Upvote onClick={() => null} value={99} />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('99');
  });
});
