import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RequireAuth from './utils/RequireAuth';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import Loader from './utils/loader';
import { publicRoutes, adminRoutes, userRoutes } from './routes/routesConfig';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              {...route}
            />
          ))}

          <Route
            path="/admin/*"
            element={
              <RequireAuth role="admin">
                <AdminLayout>
                  <Routes>
                    <Route
                      path=""
                      element={
                        <Navigate
                          to="/admin/dashboard"
                          replace={true}
                        />
                      }
                    />
                    <Route
                      path="*"
                      element={<PageNotFound />}
                    />
                    {adminRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Routes>
                </AdminLayout>
              </RequireAuth>
            }
          />

          <Route
            path="/user/*"
            element={
              <RequireAuth role="user">
                <UserLayout>
                  <Routes>
                    <Route
                      path=""
                      element={
                        <Navigate
                          to="/user/home"
                          replace={true}
                        />
                      }
                    />
                    <Route
                      path="*"
                      element={<PageNotFound />}
                    />
                    {userRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Routes>
                </UserLayout>
              </RequireAuth>
            }
          />

          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
