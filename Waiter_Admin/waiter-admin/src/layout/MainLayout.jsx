import { Link, useLocation } from "react-router-dom"

import {
  FaHome,
  FaUtensils,
  FaClipboardList,
  FaChair,
  FaUsers,
  FaCog
} from "react-icons/fa"

export default function MainLayout({ children }) {

  const location = useLocation()

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />
    },
    {
      name: "Menu",
      path: "/menu",
      icon: <FaUtensils />
    },
    {
      name: "Pesanan",
      path: "/orders",
      icon: <FaClipboardList />
    },
    {
      name: "Meja",
      path: "/tables",
      icon: <FaChair />
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />
    },
  ]

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <div className="w-72 min-h-screen bg-[#111827] text-white p-6 flex flex-col">

        {/* LOGO */}
        <div className="mb-12">

          <h1 className="text-3xl font-bold">
            WAITER
          </h1>

          <p className="text-gray-400 mt-1">
            Admin Dashboard
          </p>

        </div>

        {/* PROFILE */}
        <div className="bg-white/10 rounded-3xl p-4 mb-10">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-orange-400"></div>

            <div>

              <h2 className="font-bold text-lg">
                Admin
              </h2>

              <p className="text-gray-400 text-sm">
                Super Admin
              </p>

            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="flex flex-col gap-3 flex-1">

          {menus.map(menu => (

            <Link
              key={menu.path}
              to={menu.path}
              className={`
                flex items-center gap-4 p-4 rounded-2xl transition
                ${location.pathname === menu.path
                  ? "bg-orange-500 text-white shadow-lg"
                  : "hover:bg-white/10 text-gray-300"}
              `}
            >

              <div className="text-xl">
                {menu.icon}
              </div>

              <span className="font-medium">
                {menu.name}
              </span>

            </Link>

          ))}

        </div>

        {/* BOTTOM */}
        <div>

          <button className="w-full bg-white/10 hover:bg-white/20 transition p-4 rounded-2xl flex items-center gap-4">

            <FaCog />

            Settings

          </button>

        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-gray-100 min-h-screen p-8 overflow-auto">

        {children}

      </div>

    </div>
  )
}