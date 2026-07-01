import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('loads product cards from the bundled CSV data automatically', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      text: () =>
        Promise.resolve(
          'Product Name,Price,Original Price,Discount,Rating,Reviews,Product URL,Image URL\n"vivo Y05 (Straw Gold, 64 GB)","₹12,999","₹34,999","62% off","3.7","20 Ratings","https://example.com/product","https://example.com/image.jpg"'
        ),
    })
  );

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/vivo Y05/i)).toBeInTheDocument();
  });
});
