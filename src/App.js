import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";

const STORAGE_KEY = "gk_books";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mounting: đọc localStorage trước, không có thì gọi API
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setBooks(JSON.parse(saved));
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    const controller = new AbortController();
    axios
      .get("/data/books.json", { signal: controller.signal })
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return; // request bị hủy -> bỏ qua
        setError("Không tải được dữ liệu");
        setLoading(false);
      });

    // Unmounting: hủy request
    return () => controller.abort();
  }, []);

  // Updating: lưu lại mỗi khi books đổi (chỉ khi đã tải xong)
  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  }, [books, loading, error]);

  const addBook = ({ title, author, year, category }) => {
    setBooks((prev) => {
      const maxId = prev.reduce((max, b) => (b.id > max ? b.id : max), 0);
      return [
        ...prev,
        { id: maxId + 1, title, author, year, category, available: true },
      ];
    });
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBorrow = (id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, available: !b.available } : b))
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home books={books} />} />
        <Route
          path="books"
          element={
            <BookList books={books} onDelete={deleteBook} onToggle={toggleBorrow} />
          }
        />
        <Route path="books/new" element={<AddBook books={books} onAdd={addBook} />} />
        <Route path="books/:id" element={<BookDetail books={books} />} />
      </Route>
    </Routes>
  );
};

export default App;
