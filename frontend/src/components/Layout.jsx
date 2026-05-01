import Header from "@/modules/layout/Header";
import Footer from "@/modules/layout/Footer";
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
