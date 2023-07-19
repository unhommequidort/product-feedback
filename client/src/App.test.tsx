import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('should render', () => {
    render(<App />);
    expect(screen.getByText('count is 0')).toBeInTheDocument();
  });
});
