import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

//Private Route
import PrivateRoutes from './components/PrivateRoutes.jsx';

//Auth
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

import Profile from './pages/User/Profile.jsx';

import AdminRoutes from './pages/Admin/AdminRoutes.jsx';
import UsersList from './pages/Admin/UsersList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from './pages/Admin/ProductList.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<App />}
        >
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/register"
                element={<Register />}
            />
            <Route
                path=""
                element={<PrivateRoutes />}
            >
                <Route
                    path="/profile"
                    element={<Profile />}
                />
            </Route>

            {/* Admin Routes */}
            <Route
                path="/admin"
                element={<AdminRoutes />}
            >
                <Route
                    path="userslist"
                    element={<UsersList />}
                />
                <Route
                    path="categorylist"
                    element={<CategoryList />}
                />
                <Route
                    path="productlist"
                    element={<ProductList />}
                />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />,
    </Provider>
);
