import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
