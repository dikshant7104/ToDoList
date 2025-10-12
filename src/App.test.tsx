import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

const renderComponent = () => {
  return render(<App />);
};

describe('App', () => {
  it.only('renders the heading', () => {
    const { getByText, debug } = renderComponent();
    debug;
    expect(getByText(/To-Do List/i)).toBeInTheDocument();
  });

  it('renders InputData and List components', () => {
    const { getByText } = renderComponent();
    expect(getByText('Mock InputData')).toBeInTheDocument();
    expect(getByText('Mock List')).toBeInTheDocument();
  });
});
