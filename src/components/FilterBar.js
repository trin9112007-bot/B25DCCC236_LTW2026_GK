import { CATEGORIES } from "../data";

const FilterBar = ({ keyword, onKeywordChange, category, onCategoryChange, searching }) => (
  <div className="filter">
    <div>
      <label htmlFor="search">Tìm kiếm</label>{" "}
      <input
        id="search"
        type="text"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />{" "}
      {searching && <span>Đang tìm...</span>}
    </div>
    <div>
      <label htmlFor="category">Thể loại</label>{" "}
      <select
        id="category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  </div>
);

export default FilterBar;
