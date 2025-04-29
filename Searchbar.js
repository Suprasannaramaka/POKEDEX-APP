function SearchBar({ setSearchTerm }) {
    return (
      <input
        type="text"
        placeholder="Search Pokemon..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  } 
  export default SearchBar;
  