import { Link } from "react-router-dom"

import {
  FaHome,
  FaUtensils
} from "react-icons/fa"

export default function MainLayout({ children }) {

  return (
    <div className="flex">

      <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-10">
          WAITER ADMIN
        </h1>

        <div className="flex flex-col gap-3">

          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700"
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/menu"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700"
          >
            <FaUtensils />
            Menu
          </Link>

        </div>

      </div>

      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        {children}
      </div>

    </div>
  )
}