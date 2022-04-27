// import { render, screen } from '@testing-library/react';
import { act, create } from 'react-test-renderer';
import App from './App';

describe('test App', () => {
  // test('renders learn react link', () => {
  //   render(<App />);
  //   const linkElement = screen.getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
  // });

  test('renders learn react link', () => {
    let root;
    act(() => {
      root = create(
        <App />,
      );
    });
    expect(root.toJSON()).toMatchSnapshot();
  });
});
