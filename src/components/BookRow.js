import { Link } from "react-router-dom";

const BookRow = ({ book, onDelete, onToggle }) => {
  const { id, title, author, year, category, available } = book;
  return (
    <tr className={available ? "" : "borrowed"}>
      <td><Link to={`/books/${id}`}>{title}</Link></td>
      <td>{author}</td>
      <td>{year}</td>
      <td>{category}</td>
      <td>{available ? "Có sẵn" : "Đang mượn"}</td>
      <td>
        <button onClick={() => onToggle(id)}>
          {available ? "Cho mượn" : "Nhận trả"}
        </button>
        <button onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default BookRow;
