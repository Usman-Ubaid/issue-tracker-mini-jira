import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <div>
        <Sidebar />
      </div>
      <div className="main-wrapper">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
