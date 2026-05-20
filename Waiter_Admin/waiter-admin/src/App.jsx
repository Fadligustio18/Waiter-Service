import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import MainLayout from "./layout/MainLayout"

import Dashboard from "./pages/Dashboard"
import MenuPage from "./pages/MenuPage"
import OrdersPage from "./pages/OrdersPage"
import TablesPage from "./pages/TablesPage"
import UsersPage from "./pages/UsersPage"

import LoginPage from "./pages/auth/LoginPage"

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* DASHBOARD LAYOUT */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/menu"
          element={
            <MainLayout>
              <MenuPage />
            </MainLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <MainLayout>
              <OrdersPage />
            </MainLayout>
          }
        />

        <Route
          path="/tables"
          element={
            <MainLayout>
              <TablesPage />
            </MainLayout>
          }
        />

        <Route
          path="/users"
          element={
            <MainLayout>
              <UsersPage />
            </MainLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}