import Header from "../modules/Header";
import Footer from "../modules/Footer";
function Layout({ children }) {
  return (
    <>
      <header>
        <Header />
      </header>
      {children}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
