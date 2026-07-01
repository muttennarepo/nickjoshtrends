
import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products = [] }) => {
  const [filterBrand, setFilterBrand] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get unique brands
  const brands = useMemo(() => {
    const brandSet = new Set();
    products.forEach(p => {
      const brand = p.productName.split(' ')[0];
      brandSet.add(brand);
    });
    return Array.from(brandSet).sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filterBrand === 'all') return true;
      return p.productName.startsWith(filterBrand);
    });
  }, [products, filterBrand]);

  // Sort products by discount descending
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    const parseDiscount = (discountStr) => {
      return parseInt(discountStr.replace(/[^0-9-]/g, '')) || 0;
    };

    return sorted.sort((a, b) => parseDiscount(b.discount) - parseDiscount(a.discount));
  }, [filteredProducts]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="product-list-container">
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="brand-filter">Brand:</label>
          <select 
            id="brand-filter"
            value={filterBrand}
            onChange={(e) => {
              setFilterBrand(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

          <div className="results-info">
          Showing {paginatedProducts.length} of {sortedProducts.length} products
        </div>
      </div>

      <div className="products-grid">
        {paginatedProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {paginatedProducts.length === 0 && (
        <div className="no-products">No products found</div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
