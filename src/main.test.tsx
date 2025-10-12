import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

// This test checks if the App component renders without crashing.
describe('Main entrypoint', () => {
  it('renders App component without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
