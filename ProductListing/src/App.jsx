import React from 'react'
import { useState, useEffect } from 'react'
import ProductCard from './assets/components/ProductCard';
import FilterBrand from './assets/components/FilterBrand';
import FilterPrice from './assets/components/FilterPrice';

const App = () => {
  let [input, setInput] = useState("");
  let [apiData, setApiData] = useState([]);
  let [copyApiData, setCopyApiData] = useState([]);

  let [selectBrand, setSelectBrand] = useState("");
  let [selectPrice, setSelectPrice] = useState("");
  let [filterType, setFilterType] = useState(true);


  let handleSearch = async () => {
    if (input.trim() === "") {
      alert("Please enter a valid input");
      return;
    }

    let res = await fetch(`https://dummyjson.com/products/search?q=${input}`)
    let data = await res.json();

    console.log(data.products);
  }

  let fetchProduct = async () => {
    let products = await fetch("https://dummyjson.com/products");
    let data = await products.json();

    setApiData(data.products);
    setCopyApiData(data.products);
  }

  useEffect(() => fetchProduct(), [])

  let handleAscending = () => {
    let arr = [...copyApiData].sort((a, b) => a.price - b.price);
    setCopyApiData(arr);
  }

  let handleDescending = () => {
    let arr = [...copyApiData].sort((a, b) => b.price - a.price);
    setCopyApiData(arr);
  }

  let handleFilterBrand = (e) => {
    let val = e.target.value;
    setSelectBrand(val);
    console.log(val)

    if (val == "show-all") {
      setCopyApiData(apiData);
      return;
    }

    let arr = apiData.filter((elem) => elem.brand === val);
    console.log("selected brand", selectBrand);
    console.log(arr)
    setCopyApiData(arr)
  }

  let handleFilterPrice = (e) => {
    let val = e.target.value;
    setSelectPrice(val);

    if (val === "show-all") {
      setCopyApiData(apiData);
      return;
    }

    let [min, max] = val.split("-").map(Number);
    let arr = apiData.filter((elem) => elem.price >= min && elem.price <= max)
    setCopyApiData(arr);
    console.log(selectPrice);

  }

  console.log(apiData);

  return (
    <>
      <input type="text" placeholder="Enter product name..."
        onChange={(e) => setInput(e.target.value)} value={input} />

      <button onClick={handleSearch}>Search </button><br /><br />

      <button onClick={handleAscending}>Show in Ascending order</button>
      <button onClick={handleDescending}>Show in Descending order</button>
      <button onClick={()=>{
        setCopyApiData(apiData)
      }}>Show in original order</button>

      <br /><br />

      <h3>Apply filters</h3>

      <button onClick={() => setFilterType((prev) => !prev)}>Change Filter Type</button>

      {filterType ? (<FilterBrand apiData={apiData} handleFilterBrand={handleFilterBrand} />) :
        (<FilterPrice handleFilterPrice={handleFilterPrice} />)}

      <div className="Products">
        {
          copyApiData.map((elem, index) => {
            return <ProductCard key={index} elem={elem} />
          })
        }
      </div>



    </>
  )
}

export default App
