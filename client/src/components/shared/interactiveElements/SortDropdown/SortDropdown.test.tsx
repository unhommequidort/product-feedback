import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SortDropdownButton } from './SortDropdownButton';

describe('SortDropdown', () => {
  it('renders correctly', () => {
    render(<SortDropdownButton handleOptionClick={() => null} />);
    const dropdown = screen.getByRole('button', { name: /Sort by/i });
    expect(dropdown).toBeInTheDocument();
  });

  it('renders correctly with options', async () => {
    const user = userEvent.setup();
    render(<SortDropdownButton handleOptionClick={() => null} />);
    const dropdown = screen.getByRole('button', { name: /Sort by/i });
    await user.click(dropdown);
    const option = screen.getByRole('menuitem', { name: /Least Upvotes/i });
    expect(option).toBeInTheDocument();
  });

  it('renders correctly with options and selects an option', async () => {
    const user = userEvent.setup();
    render(<SortDropdownButton handleOptionClick={() => null} />);
    const dropdown = screen.getByRole('button', { name: /Sort by/i });
    await user.click(dropdown);
    const option = screen.getByRole('menuitem', { name: /Least Upvotes/i });
    screen.debug();
    await user.click(option);
    expect(
      screen.getByRole('button', { name: /Least Upvotes/i })
    ).toBeInTheDocument();
    expect(option).not.toBeInTheDocument();
  });
});
