import { render, screen } from '@testing-library/react';

import { BackButton } from './BackButton';

describe('BackButton', () => {
  it('renders correctly', () => {
    render(<BackButton>Click me</BackButton>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
  });
});
