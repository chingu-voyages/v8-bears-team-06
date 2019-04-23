import React, { useState } from "react";

const SearchBox = ({ onEnter }) => {
  const [query, setQuery] = useState("");
  return (
    <div className="active-pink-3 active-pink-4">
      <input
        type="search"
        className="form-control"
        aria-label="Search"
        placeholder="Search works"
        value={query}
        onChange={event => {
          setQuery(event.target.value);
        }}
        onKeyPress={event => {
          if (event.key === "Enter") {
            onEnter(query);
          }
        }}
      />
    </div>
  );
};

export default SearchBox;
