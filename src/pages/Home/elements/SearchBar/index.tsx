import React from 'react'
import './styles.scss'

interface ISearchBarProps {
  length: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}
const SearchBar = ({ length, onChange }: ISearchBarProps) => {
  return (
    <div className="search-box">
      <p className="baged">{length}</p>
      <input placeholder="filter podcast..." className="search-input" type="text" onChange={onChange} />
    </div>
  )
}

export default SearchBar
