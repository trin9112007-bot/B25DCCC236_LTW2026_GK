import { NavLink } from "react-router-dom";

const NavBar = () => (
  <nav>
    <NavLink to="/" end>Trang chủ</NavLink>
    <NavLink to="/books" end>Danh sách</NavLink>
    <NavLink to="/books/new" end>Thêm mới</NavLink>
  </nav>
);

export default NavBar;
