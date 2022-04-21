import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import { SearchStyled } from "./styled";

interface searchProps {
  placeholder?: string;
  onSearch(searchText: string): void;
}

const MainSearch: React.FC<searchProps> = ({
  placeholder = "Search",
  onSearch,
}) => {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchStyled className="row">
      <div className="col">
        <div className="input-group flex-nowrap">
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => onSearch(searchText)}
            type="button"
            className="input-group-text fw-bold"
            id="addon-wrapping"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </SearchStyled>
  );
};

export default MainSearch;
