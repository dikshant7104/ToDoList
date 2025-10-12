import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

const renderComponent = () => {
  return render(<App />);
};

describe('App', () => {
  it('renders the heading', () => {
    const { getByText } = renderComponent();
    expect(getByText(/To-Do List/i)).toBeInTheDocument();
  });

  it('renders InputData and List components', () => {
    const { getByRole, getByTestId } = renderComponent();

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByTestId('list')).toBeInTheDocument();
  });
});
