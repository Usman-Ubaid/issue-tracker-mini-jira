import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
