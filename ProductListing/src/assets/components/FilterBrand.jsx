import React from 'react'

const FilterBrand = ({handleFilterBrand, apiData}) => {
  return (
    <div>
      <p>Apply filter based on brand</p>
      <select onChange={handleFilterBrand}>
        <option value="show-all">Show All</option>
        {apiData.map((elem)=>{  

          return (<option value={elem.brand} key={elem.id}>
            {elem.brand}
          </option>)
        })}
      </select>
    </div>
  )
}

export default FilterBrand
