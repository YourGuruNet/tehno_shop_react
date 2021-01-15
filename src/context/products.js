import React, { useEffect } from 'react';
import axios from 'axios';
import url from '../utils/URL';

export const ProductContext = React.createContext();

//Featured products
const featuredProductsPicker = (date) => {
  return date.filter((item) => {
    return item.featured === true;
  });
};

// Paginated products
const paginate = (products) => {
  const itemsPerPage = 8;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);
  const newProduct = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });
  return newProduct;
};

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  const [page, setPage] = React.useState([0]);

  const [sorted, setSorted] = React.useState([]);
  const [popup, setPopup] = React.useState({ show: false, image: [] });

  //Open image popup
  const OpenPopup = (index) => {
    setPopup({ show: true, image: index });
  };
  const ClosePopup = () => {
    setPopup({ show: false, image: [] });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => {
      const featureProducts = featuredProductsPicker(response.data);
      setProducts(response.data);
      setSorted(paginate(response.data));
      setFeatured(featureProducts);
      setLoading(false);
    });
    return () => {};
  }, []);

  //Filter
  const [filter, setFilter] = React.useState({
    search: '',
    section: 'all',
    shipping: true,
    price: 200,
    discounted: false,
    featured: false,
  });

  //Update filters
  const updateFilter = (event) => {
    const type = event.target.type;
    const filter = event.target.name;
    const value = event.target.value;
    let filterValue;

    type === 'checkbox'
      ? (filterValue = event.target.checked)
      : (filterValue = value);
    setFilter({ ...filter, [filter]: filterValue });
  };

  /* useEffect(() => {
    let newProducts = [...products].sort((a, b) => (a.price = b.price));
    setPage(0);
    setSorted(paginate(newProducts));
  }, [filter, products]);*/

  //Change page
  const changePage = (index) => {
    setPage(index);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
        sorted,
        page,
        changePage,
        popup,
        OpenPopup,
        ClosePopup,
        filter,
        updateFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
