import { useState, useEffect } from 'react';
import Papa from 'papaparse'; // Use: npm install papaparse

export const useCSVParser = (csvData) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!csvData) return;

    try {
      Papa.parse(csvData, {
        header: true,
        complete: (results) => {
          
          const formattedProducts = results.data
            .map(row => ({
              productName: row['Product Name'] || '',
              price: row.Price || '₹0',
              originalPrice: row['Original Price'] || '₹0',
              discount: row.Discount || '0%',
              rating: row.Rating || '',
              reviews: row.Reviews || '',
              productUrl: row['External URL'] || row['Product URL'] || '#',
              imageUrl: row['Image URL'] || '#'
            }));
            console.log('Current formattedProducts:',formattedProducts);
          setProducts(formattedProducts);
          setLoading(false);
        },
        error: (error) => {
          setError(error.message);
          setLoading(false);
        }
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [csvData]);

  return { products, loading, error };
};
