import React from "react";
import { ISearchBarProps } from "./interface";
import styles from "./styles.module.scss";

const SearchBar = ({ length, onChange }: ISearchBarProps) => {
  return (
    <div className={styles["search-box"]}>
      <p className={styles["baged"]}>{length}</p>
      <input
        placeholder="filter podcast..."
        className={styles["search-input"]}
        type="text"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
