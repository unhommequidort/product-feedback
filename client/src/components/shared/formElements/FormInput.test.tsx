import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormExample from '@/tests/FormExample';

describe('FormInput', () => {
  it('renders a label and input', () => {
    render(<FormExample />);
    expect(screen.getByRole('textbox', { name: 'Test' })).toBeInTheDocument();
  });

  it('updates the input value when typing', async () => {
    const user = userEvent.setup();
    render(<FormExample />);
    const input = screen.getByRole('textbox', { name: 'Test' });
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });
});
