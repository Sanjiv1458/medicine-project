import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  // Generating some random data for each chart
  const generateRandomData = (count) => {
    return Array.from({ length: count }, (_, index) => ({
      name: `Day ${index + 1}`,
      totalSales: Math.floor(Math.random() * 1000) + 1000,
      sessions: Math.floor(Math.random() * 500) + 200,
      returningCustomers: (Math.random() * 10).toFixed(2),
      visitors: Math.floor(Math.random() * 5000) + 1000,
      pageViews: Math.floor(Math.random() * 20000) + 5000,
    }));
  };

  const totalSalesData = generateRandomData(30);
  const sessionsData = generateRandomData(30);
  const returningCustomersData = generateRandomData(30);
  const visitorsData = generateRandomData(30);
  const pageViewsData = generateRandomData(30);

  const pieChartData = [
    { name: 'Category A', value: Math.floor(Math.random() * 100) },
    { name: 'Category B', value: Math.floor(Math.random() * 100) },
    { name: 'Category C', value: Math.floor(Math.random() * 100) },
    // Add more categories as needed
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="grid min-h-screen bg-gray-100/40 lg:grid-cols-[280px_1fr] dark:bg-gray-800/40 dark:text-white">
      {/* Left Sidebar */}
      <div className="hidden border-r border-gray-200 bg-gray-100/40 lg:block dark:border-gray-800 dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b border-gray-200 px-6 dark:border-gray-800">
            <a
              className="flex items-center gap-2 font-semibold"
              href="#"
              rel="ugc">
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
                className="h-6 w-6">
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                <path d="M12 3v6"></path>
              </svg>
              <span className="">Acme Inc</span>
            </a>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground ml-auto h-8 w-8">
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
                className="h-4 w-4">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <span className="sr-only">Toggle notifications</span>
            </button>
          </div>
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              to="/home"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-700"
              rel="ugc">
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
                className="h-4 w-4">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-700"
              rel="ugc">
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
                className="h-4 w-4">
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              Orders
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-700"
              rel="ugc">
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
                className="h-4 w-4">
                <path d="m7.5 4.27 9 5.15"></path>
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                <path d="m3.3 7 8.7 5 8.7-5"></path>
                <path d="M12 22V12"></path>
              </svg>
              Products
            </Link>
            <Link
              to="/customers"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-700"
              rel="ugc">
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
                className="h-4 w-4">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle
                  cx="9"
                  cy="7"
                  r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Customers
            </Link>
            <Link
              to="/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-700"
              rel="ugc">
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
                className="h-4 w-4">
                <path d="M3 3v18h18"></path>
                <path d="m19 9-5 5-4-4-3 3"></path>
              </svg>
              Analytics
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col bg-gray-100 dark:bg-gray-800">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <a
            className="lg:hidden"
            href="#"
            rel="ugc">
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
              className="h-6 w-6">
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
              <path d="M12 3v6"></path>
            </svg>
            <span className="sr-only">Home</span>
          </a>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <div className="flex items-center">
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
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400">
                    <circle
                      cx="11"
                      cy="11"
                      r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>

                  <input
                    type="search"
                    className="flex h-10 border border-input pl-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-gray-100/50 rounded-lg md:w-2/3 lg:w-1/3 dark:bg-gray-800/50"
                    placeholder="Search"
                  />
                </div>
              </div>
            </form>
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            type="button"
            id="radix-:Rdlqfnnja:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed">
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{ aspectRatio: '32/32', objectFit: 'cover' }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </button>
        </header>
        {/* Main Content Body */}

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-100 dark:bg-gray-800 dark:text-white">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card Section 1 */}
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col"
              data-v0-t="card">
              <div className="flex flex-col space-y-1.5 p-6">
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">$2389.00</h3>
              </div>
              <div className="p-6">
                <LineChart
                  width={300}
                  height={200}
                  data={totalSalesData}
                  style={{ maxWidth: '100%', margin: 'auto' }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid
                    stroke="#eee"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="totalSales"
                    stroke="#8884d8"
                  />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </div>
            </div>

            {/* Card Section 2 */}
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card">
              <div className="flex flex-col space-y-1.5 p-6">
                <p className="text-sm text-muted-foreground">Sessions</p>
                <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">345</h3>
              </div>
              <div className="p-6">
                <LineChart
                  width={300}
                  height={200}
                  data={sessionsData}
                  style={{ maxWidth: '100%', margin: 'auto' }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid
                    stroke="#eee"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#82ca9d"
                  />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </div>
            </div>

            {/* Card Section 3 */}
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col"
              data-v0-t="card">
              <div className="flex flex-col space-y-1.5 p-6">
                <p className="text-sm text-muted-foreground">Returning Customers</p>
                <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">3,456</h3>
              </div>
              <div className="p-6">
                <LineChart
                  width={300}
                  height={200}
                  data={returningCustomersData}
                  style={{ maxWidth: '100%', margin: 'auto' }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid
                    stroke="#eee"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="returningCustomers"
                    stroke="#ffc658"
                  />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </div>
            </div>
          </div>

          {/* Card Section 4 */}
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <p className="text-sm text-muted-foreground">Visitors</p>
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">3,456</h3>
            </div>
            <div className="p-6">
              <LineChart
                width={300}
                height={200}
                data={visitorsData}
                style={{ maxWidth: '100%', margin: 'auto' }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid
                  stroke="#eee"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#ff7300"
                />
                <Tooltip />
                <Legend />
              </LineChart>
            </div>
          </div>

          {/* Card Section 5 */}
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <p className="text-sm text-muted-foreground">Page Views</p>
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">{pageViewsData[pageViewsData.length - 1].pageViews}</h3>
            </div>
            <div className="p-6">
              <LineChart
                width={300}
                height={200}
                data={pageViewsData}
                style={{ maxWidth: '100%', margin: 'auto' }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid
                  stroke="#eee"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#ff7300"
                />
                <Tooltip />
                <Legend />
              </LineChart>
            </div>
          </div>
          {/* Pie Chart Section */}
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <p className="text-sm text-muted-foreground">Distribution of Page Views</p>
              <div className="flex justify-center items-center h-32">
                <PieChart
                  width={300}
                  height={200}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    label>
                    {pageViewsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
