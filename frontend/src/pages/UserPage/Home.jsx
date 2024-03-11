import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import DarkModeSwitcher from '../../utils/DarkModeSwitcher';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  const mainText = 'Your Trusted Partner in Healthcare Solutions';
  const [animatedText, setAnimatedText] = useState('');
  const [underlineVisible, setUnderlineVisible] = useState(false);

  useEffect(() => {
    const mainTextLength = mainText.length;
    let currentIndex = 0;

    const interval = setInterval(() => {
      setAnimatedText(mainText.substring(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex === mainTextLength) {
        clearInterval(interval);
        setUnderlineVisible(true);
      }
    }, 100); // Adjust the typing speed by changing the interval

    return () => clearInterval(interval);
  }, []);

  const textSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(0.5em)' },
    config: config.molasses,
  });

  const underlineSpring = useSpring({
    width: underlineVisible ? '100%' : '0%',
    from: { width: '0%' },
    delay: 500, // Delay the animation to start after text animation
  });
  return (
    <div className="flex flex-col min-h-[100vh] dark:bg-gray-600">
      {/* Header */}
      {/* <header className="px-4 lg:px-6 h-14 flex items-center justify-center dark:bg-gray-800">
        <a
          className="flex items-center justify-center"
          href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-gray-800 dark:text-white">
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
            <path d="m8.5 8.5 7 7"></path>
          </svg>
          <span className="sr-only">PharmaCare</span>
        </a>

        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <a
            className="text-sm font-medium hover:underline underline-offset-4 transition duration-300 ease-in-out text-gray-800 dark:text-white dark:hover:text-gray-800"
            href="#">
            Products
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4 transition duration-300 ease-in-out text-gray-800 dark:text-white dark:hover:text-gray-800"
            href="#">
            Services
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4 transition duration-300 ease-in-out text-gray-800 dark:text-white dark:hover:text-gray-800"
            href="#">
            About Us
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4 transition duration-300 ease-in-out text-gray-800 dark:text-white dark:hover:text-gray-800"
            href="#">
            Contact
          </a>
          <DarkModeSwitcher />
          <div className="relative">
            <span
              onClick={toggleMenu}
              className="cursor-pointer relative flex shrink-0 overflow-hidden rounded-full h-9 w-9"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              data-state={isMenuOpen ? 'open' : 'closed'}>
              <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-800 text-white dark:bg-gray-600 dark:text-gray-300">
                <svg
                  className="feather feather-user"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                  />
                </svg>
              </span>
              <span className="sr-only">Toggle user menu</span>
            </span>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md rounded-md py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  My Account
                </a>
                <a
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  Login
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  Settings
                </a>
              </div>
            )}
          </div>
        </nav>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 mx-auto">
        {/* Section 1 */}
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <animated.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none relative text-gray-900 dark:text-gray-50"
                    style={textSpring}>
                    {animatedText}
                    <animated.div
                      className="absolute bottom-0 left-0 h-1 bg-blue-500"
                      style={underlineSpring}
                    />
                  </animated.h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">Providing innovative pharmaceutical products and services to improve lives.</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    to="/user/product">
                    Explore Products
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    to="/user/contact">
                    Contact Us
                  </Link>
                </div>
              </div>
              <img
                src="https://st2.depositphotos.com/1576106/10025/i/450/depositphotos_100255514-stock-photo-pile-of-medicines-and-syringes.jpg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        {/* Section 2 */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-y">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-900 dark:text-gray-50">Providing Quality Healthcare Solutions</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">Join us in our mission to deliver cutting-edge healthcare solutions to the world.</p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1 text-gray-900 dark:text-gray-900"
                  placeholder="Enter your email"
                  type="email"
                />
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-200 dark:hover:text-gray-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  type="submit">
                  Sign Up
                </button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign up to receive updates and news from PharmaCare.
                <a
                  className="underline underline-offset-2"
                  href="#">
                  Terms & Conditions
                </a>
              </p>
            </div>
          </div>
        </section>
        {/* Section 3 */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-900 dark:text-gray-50">Our Commitment to Healthcare Excellence</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">Discover how PharmaCare is revolutionizing healthcare with our innovative products and services.</p>
            </div>
            <div className="flex space-x-4 lg:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="/user/contact">
                Contact Us
              </Link>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#">
                Learn More
              </a>
            </div>
          </div>
        </section>
        {/* Section 4 */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:text-gray-400 dark:bg-gray-700 text-gray-900">Innovation</div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-900 dark:text-gray-50">Leading the Way in Healthcare Innovation</h2>
                <a
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#">
                  Learn More
                </a>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:text-gray-400 dark:bg-gray-700 text-gray-900">Quality</div>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">Our commitment to quality ensures that every product and service we offer meets the highest standards.</p>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  to="/user/contact">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Section 5 */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:text-gray-400 dark:bg-gray-700 text-gray-900">Sustainability</div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-900 dark:text-gray-50">Our Sustainable Practices</h2>
                <a
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#">
                  Learn More
                </a>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:text-gray-400 dark:bg-gray-700 text-gray-900">Community</div>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">Engaging with local communities to promote health and well-being.</p>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  to="/user/contact">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">

        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 PharmaCare. All rights reserved.</p>

        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-xs hover:underline underline-offset-4"
            href="#">
            Terms of Service
          </a>
          <a
            className="text-xs hover:underline underline-offset-4"
            href="#">
            Privacy
          </a>
        </nav>
      </footer> */}
    </div>
  );
};

export default Home;
