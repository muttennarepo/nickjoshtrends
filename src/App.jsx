import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import { useCSVParser } from './hooks/useCSVParser';
import csvDataFile from './flipkart_products.csv';
import './App.css';

function App() {
  const [csvData, setCsvData] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const { products, loading, error } = useCSVParser(csvData);

  useEffect(() => {
    const loadDefaultCsv = async () => {
      try {
        const response = await fetch(csvDataFile);
        const text = await response.text();
        setCsvData(text);
      } catch (err) {
        console.error('Failed to load CSV data:', err);
      }
    };

    loadDefaultCsv();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCsvData(e.target.result);
        setIsDataLoaded(true);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛍️ Flipkart Mobile Products</h1>
        <p>Browse and filter products with ease</p>
      </header>

      <main className="app-main">
        {!isDataLoaded ? (
          <div className="upload-section">
            <div className="upload-box">
              <input
                type="file"
                id="csv-upload"
                accept=".csv"
                onChange={handleFileUpload}
              />
              <label htmlFor="csv-upload">
                📁 Click to upload CSV file
              </label>
              <p>or paste CSV data below</p>
              <textarea
                placeholder="Paste your CSV data here..."
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
              />
              <button onClick={() => setIsDataLoaded(true)}>
                Load Data
              </button>
            </div>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>Error: {error}</p>
            <button onClick={() => setIsDataLoaded(false)}>Try Again</button>
          </div>
        ) : loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <ProductList products={products} />
        )}
      </main>
    </div>
  );
}

export default App;
