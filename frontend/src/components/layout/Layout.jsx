import Header from "./Header";
import Footer from "./Footer";

// Layout component wraps all pages with Header and Footer
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top navigation bar */}
      <Header />

      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default Layout;
