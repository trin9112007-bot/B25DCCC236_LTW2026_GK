import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import BookTable from "../components/BookTable";

const BookList = ({ books, onDelete, onToggle }) => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [category, setCategory] = useState("Tất cả");

  // Debounce: chờ ngừng gõ 500ms mới lọc
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(debouncedKeyword.trim().toLowerCase()) &&
      (category === "Tất cả" || b.category === category)
  );

  return (
    <div>
      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
        searching={keyword !== debouncedKeyword}
      />
      <p>{`Tìm thấy ${filtered.length} cuốn sách`}</p>
      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <BookTable books={filtered} onDelete={onDelete} onToggle={onToggle} />
      )}
    </div>
  );
};

export default BookList;
