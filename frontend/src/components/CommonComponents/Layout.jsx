import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="app-container">
        <Sidebar />
        <Navbar />
      </div>
      {/* <div>{children}</div> */}
    </div>
  );
};

export default Layout;
