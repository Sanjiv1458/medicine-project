// routes/index.js
import { lazy } from 'react';

// Common Pages
const Home = lazy(() => import('../pages/UserPage/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));

// Admin Pages
const AdminDashboard = lazy(() => import('../pages/AdminPage/AdminDashboard'));
const CreateProductForm = lazy(() => import('../components/adminComponents/CreateProductForm'));
const UpdateProduct = lazy(() => import('../components/adminComponents/UpdateProduct'));
const ProductList = lazy(() => import('../components/adminComponents/ProductList'));
const NoProducts = lazy(() => import('../pages/NoProducts'));
const AdminInbox = lazy(() => import('../components/adminComponents/AdminInbox'));
const ProductQuery = lazy(() => import('../components/adminComponents/ProductQuery'));

// User Pages
const UserHome = lazy(() => import('../pages/UserPage/UserHome'));
const Profile = lazy(() => import('../pages/Profile'));
const Product = lazy(() => import('../components/userComponents/ProductSidebar'));
const Company = lazy(() => import('../components/userComponents/Company'));
const Contact = lazy(() => import('../components/userComponents/QuerySection'));
const SubmitMessage = lazy(() => import('../components/userComponents/SubmitMessage'));
const SubmitQuery = lazy(() => import('../components/userComponents/SubmitQuery'));
const ProductDetails = lazy(() => import('../components/userComponents/ProductDetails'));
const Cart = lazy(() => import('../components/userComponents/Cart'));

export { Home, UserHome, SubmitMessage, SubmitQuery, Product, ProductDetails, Cart, Company, Contact, Login, Register, Unauthorized, Profile, AdminDashboard, CreateProductForm, UpdateProduct, ProductList, NoProducts, AdminInbox, ProductQuery };
