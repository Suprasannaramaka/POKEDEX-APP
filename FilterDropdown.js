const types = ["", "fire", "water", "grass", "electric", "poison", "bug", "normal", "flying"];

function FilterDropdown({ setTypeFilter }) {
  return (
    <select onChange={(e) => setTypeFilter(e.target.value)}>
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}
export default FilterDropdown;
