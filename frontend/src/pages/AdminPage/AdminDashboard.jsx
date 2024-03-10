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
  );
};

export default AdminDashboard;
