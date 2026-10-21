import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data";

const AddBook = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || year === "") {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const yearNumber = Number(year);
    if (!Number.isInteger(yearNumber) || yearNumber < 1900 || yearNumber > 2026) {
      setMessage("Năm xuất bản phải từ 1900 đến 2026");
      return;
    }

    onAdd({ title: title.trim(), author: author.trim(), year: yearNumber, category });
    navigate("/books", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Tên sách</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="author">Tác giả</label>
        <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="year">Năm xuất bản</label>
        <input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="category">Thể loại</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <button type="submit">Thêm</button>
      {message && <p className="error">{message}</p>}
    </form>
  );
};

export default AddBook;
