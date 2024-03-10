import Header from '../components/userComponents/Header';
import Navbar from '../components/userComponents/Navbar';
import Footer from '../components/userComponents/Footer';

const UserLayout = ({ children }) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
      <footer className="dark: bg-gray-600">
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayout;
