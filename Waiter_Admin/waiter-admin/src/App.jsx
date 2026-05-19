import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import MainLayout from "./layout/MainLayout"

import Dashboard from "./pages/Dashboard"
import MenuPage from "./pages/MenuPage"

export default function App() {

  return (
    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/menu"
            element={<MenuPage />}
          />

        </Routes>

      </MainLayout>

    </BrowserRouter>
  )
}