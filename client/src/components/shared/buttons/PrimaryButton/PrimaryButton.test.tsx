import { render, screen } from '@testing-library/react';

import { PrimaryButton } from './PrimaryButton';

describe('PrimaryButton', () => {
  it('renders correctly', () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
  });
});
