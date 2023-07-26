import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('should render the TextInput component', () => {
    render(<TextInput label="Test" name="test" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should render the TextInput component with a label', () => {
    render(<TextInput label="Test" name="test" />);
    const label = screen.getByRole('textbox', { name: 'Test' });
    expect(label).toBeInTheDocument();
  });

  it('should render the TextInput component with a description', () => {
    render(
      <TextInput label="Test" name="test" description="Test description" />
    );
    const description = screen.getByText('Test description');
    expect(description).toBeInTheDocument();
  });

  it('should render the TextInput component with an error', () => {
    render(<TextInput label="Test" name="test" error="Test error" />);
    const error = screen.getByText('Test error');
    expect(error).toBeInTheDocument();
  });

  it("should allow the user to type in the TextInput component's input", async () => {
    const user = userEvent.setup();
    render(<TextInput label="Test" name="test" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Test');
    expect(input).toHaveValue('Test');
  });
});
