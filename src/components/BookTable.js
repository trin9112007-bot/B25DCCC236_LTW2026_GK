import BookRow from "./BookRow";

const BookTable = ({ books, onDelete, onToggle }) => (
  <table>
    <thead>
      <tr>
        <th>Tên sách</th>
        <th>Tác giả</th>
        <th>Năm</th>
        <th>Thể loại</th>
        <th>Trạng thái</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {books.map((b) => (
        <BookRow key={b.id} book={b} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </tbody>
  </table>
);

export default BookTable;
