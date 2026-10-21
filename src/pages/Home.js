const Home = ({ books }) => {
  const total = books.length;
  const borrowed = books.reduce((sum, b) => (b.available ? sum : sum + 1), 0);
  const newest = books.reduce((max, b) => (b.year > max ? b.year : max), 0);

  return (
    <div>
      <h1>Thư viện sách</h1>
      <p>{`Tổng số sách: ${total}`}</p>
      <p>{`Số sách đang cho mượn: ${borrowed}`}</p>
      <p>{`Năm xuất bản mới nhất: ${newest}`}</p>
    </div>
  );
};

export default Home;
