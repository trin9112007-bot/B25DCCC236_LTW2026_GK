import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ loading, error }) => (
  <div className="container">
    <NavBar />
    {loading ? (
      <p>Đang tải...</p>
    ) : error ? (
      <p>{error}</p>
    ) : (
      <Outlet />
    )}
  </div>
);

export default Layout;
