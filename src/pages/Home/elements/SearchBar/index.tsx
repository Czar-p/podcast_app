import React from 'react'
import { ISearchBarProps } from './interface'
import './styles.scss'

const SearchBar = ({ length, onChange }: ISearchBarProps) => {
  return (
    <div className="search-box">
      <p className="baged">{length}</p>
      <input placeholder="filter podcast..." className="search-input" type="text" onChange={onChange} />
    </div>
  )
}

export default SearchBar
