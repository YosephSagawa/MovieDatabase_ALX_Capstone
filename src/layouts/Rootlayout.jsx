import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * The main layout of the application.
 *
 * This component renders the main sections of the application.
 * The sections are the header, main content and footer.
 *
 * @returns {JSX.Element} The main layout
 */
const Homelayout = () => {
  return (
    <div className="min-h-screen w-full bg-primary">
      {/* The header section */}
      <header>
        <Navbar />
      </header>
      {/* The main content section */}
      <main>
        {/* Outlet is a special component in React Router that renders the matched child route element. */}
        <Outlet />
      </main>
      {/* The footer section */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Homelayout;
