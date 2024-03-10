// routesConfig.js
import { Home, UserHome, SubmitMessage, SubmitQuery, Login, Register, Unauthorized, Profile, AdminDashboard, CreateProductForm, UpdateProduct, ProductList, NoProducts, AdminInbox, ProductQuery, Product, Contact, Company } from './index';

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/profile', element: <Profile /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '/user-home', element: <UserHome /> },
];

export const adminRoutes = [
  { path: 'dashboard', element: <AdminDashboard /> },
  { path: 'create', element: <CreateProductForm /> },
  { path: 'products', element: <ProductList /> },
  { path: 'noProduct', element: <NoProducts /> },
  { path: 'updateProduct/:productId', element: <UpdateProduct /> },
  { path: 'adminInbox', element: <AdminInbox /> },
  { path: 'adminQuery', element: <ProductQuery /> },
];

export const userRoutes = [
  { path: 'home', element: <UserHome /> },
  { path: 'product', element: <Product /> },
  { path: 'company', element: <Company /> },
  { path: 'contact', element: <Contact /> },
  { path: 'message/:messageId', element: <SubmitMessage /> },
  { path: 'query/:queryId', element: <SubmitQuery /> },
];
