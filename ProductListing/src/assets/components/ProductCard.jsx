import React from 'react'

const ProductCard = ({elem}) => {
  return (
    <div className="product">
      <img src={elem.thumbnail} alt="Product Image"/>
      <br/>

      name: {elem.title}
      <br/>

      title: {elem.title}
      <br/>

      price: {elem.price}
      <br/>


    </div>
  )
}

export default ProductCard
