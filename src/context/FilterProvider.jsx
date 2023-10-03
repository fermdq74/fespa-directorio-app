import { useState } from 'react'
import FilterContext from './FilterContext'

const FilterProvider = ({ children }) => {

    const [filterItem, setFilterItem] = useState([]);

    const addFilterItem = (newFilter) => { 
        setFilterItem(() =>  newFilter);
    }
    
    return (
        <FilterContext.Provider value={{ filterItem, addFilterItem }}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterProvider
