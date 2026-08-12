import React from 'react'

const FilterPrice = ({handleFilterPrice}) => {
  return (
    <div>
      <p>Apply filter based on price</p>
      <select onChange={handleFilterPrice}>
        <option value="show-all">Show All</option>
        <option value="0-5">Under $5</option>
        <option value="6-10">$6 to $10</option>
        <option value="11-50">$11 to $50</option>
        <option value="51-100">$51 to $100</option>
        <option value="101-9999">Over $100</option>
      </select>

    </div>
  )
}

export default FilterPrice
