import { useContext, useEffect, useRef, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import styles from "./styles.module.css";
import { SearchResult } from "./SearchResult";

const SearchInput = ({ responsiveClass = "" }) => {
  const { products } = useContext(ProductsContext);
  const [isFocused, setIsFocused] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const formRef = useRef(null);
  const productsContainerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [inputData, setInputData] = useState("");

  //search input handle to get the product write
  const handleOnChange = (e) => {
    setInputData(e.target.value);
  };

  //send to search page
  const handleFormSearch = (e) => {
    e.preventDefault();
    const valueEncoded = encodeURIComponent(inputData);
    location.href = `/search?sv=${valueEncoded}`;
  };

  const handleMouseDown = (e) => {
    //detect if clicked outside of search results
    if (formRef.current && !formRef.current.contains(e.target) && productsContainerRef.current && !productsContainerRef.current.contains(e.target)) {
      setIsFocused(false);
      setSearchResult(null);
    }
  };

  //IF product are clicked, remove search product result and overlay
  const handleProductSelected = () => {
    setIsFocused(false);
    setSearchResult(null);
    setInputData("");
  };

  useEffect(() => {
    if (!inputData) {
      setSearchResult(null);
      setIsFocused(false);
      return;
    }
    timeoutRef.current = setTimeout(() => {
      let result = products.filter((product) => product.title.toLowerCase().includes(inputData.toLowerCase()));
      setIsFocused(true);
      setSearchResult(result);
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inputData, products]);

  //Delete mouse event
  useEffect(() => {
    isFocused ? document.addEventListener("mousedown", handleMouseDown) : document.removeEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isFocused]);

  return (
    <>
      <div className={`${responsiveClass} search-container position-relative d-flex justify-content-center `}>
        <form className={` container input-group`} ref={formRef} onSubmit={handleFormSearch}>
          <input type="text" name="searchInput" className={`${styles.searchInput} form-control`} placeholder="Buscar producto" aria-label="search" aria-describedby="search-button" value={inputData} onChange={handleOnChange} />
          <button name="searchButton" className={`${styles.searchButton} btn`} type="button" id="search-button" onClick={handleFormSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>

        {/* Search results */}
        <div className={`${styles.productsContainer}`} ref={productsContainerRef}>
          {/* check searchResult, if it's null, don't render products, otherwise, render */}
          {searchResult ? (
            <div className="container-fluid p-0" onClick={handleProductSelected}>
              <ul className="list-group">
                {searchResult.length > 0 ? (
                  searchResult.map((product) => (
                    <li key={product.id} className="list-group-item list-group-item-action">
                      <SearchResult product={product} />
                    </li>
                  ))
                ) : (
                  <p className="m-0 p-3">No se encontraron resultados para la busqueda</p>
                )}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={`${styles.overlay} ${isFocused ? styles.active : ""}`}></div>
    </>
  );
};

export default SearchInput;
