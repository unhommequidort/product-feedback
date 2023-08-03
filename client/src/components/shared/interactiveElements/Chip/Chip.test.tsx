import { render, screen } from '@testing-library/react';

import { Chip } from './Chip';

describe('Upvote', () => {
  it('should render successfully', () => {
    render(<Chip onClick={() => null} value={'UI'} />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('UI');
  });
});
