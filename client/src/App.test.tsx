import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('should render', () => {
    const { getByText } = render(<App />);
    expect(getByText('count is 0')).toBeInTheDocument();
  });
});
