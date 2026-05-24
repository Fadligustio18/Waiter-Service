import { Link, useLocation } from "react-router-dom"
import {
  useEffect,
  useState
} from "react"

import api
from "../services/api"
import {
  FaHome,
  FaUtensils,
  FaClipboardList,
  FaChair,
  FaUsers,
  FaSignOutAlt,
  FaCog
} from "react-icons/fa"

export default function MainLayout({ children }) {

useEffect(() => {

  getNavbarData()

}, [])

  const location = useLocation()

  const menus = [
   
    {
      name: "Menu",
      path: "/menu",
      icon: <FaUtensils />
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FaClipboardList />
    },
    {
      name: "Tables",
      path: "/tables",
      icon: <FaChair />
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />
    },
  ]

  const user = JSON.parse(
  localStorage.getItem("user")
)

const [orders, setOrders] =
  useState([])

const [menusData, setMenusData] =
  useState([])

const [tables, setTables] =
  useState([])


  async function getNavbarData() {

  try {

    const orderResponse =
      await api.get("/api/order")

    setOrders(orderResponse.data)

  } catch (error) {

    console.log(error)

  }

  try {

    const menuResponse =
      await api.get("/api/menu")

    setMenusData(menuResponse.data)

  } catch (error) {

    console.log(error)

  }

  try {

    const tableResponse =
      await api.get("/api/location")

    setTables(tableResponse.data)

  } catch (error) {

    console.log(error)

  }

}
return (

  <div className="
    min-h-screen
    bg-[#f5f5f5]
    p-6
  ">

    {/* NAVBAR */}
  <div

  style={{

    backgroundImage:
      "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2070')"

  }}

  className="
    relative
    overflow-hidden

    rounded-[40px]
    bg-cover
    bg-center

    p-10

    text-white
  "
>

      {/* TOP */}
      <div className="
        flex
        justify-between
        items-center
      ">

        {/* LOGO */}
        <h1 className="
          text-2xl
          font-bold
        ">
          Panel Admin
        </h1>

        {/* MENU */}
        <div className="
          flex
          items-center
          gap-8
        ">

          {menus.map(menu => (

            <Link

              key={menu.path}

              to={menu.path}

              className={`
                px-5 py-2
                rounded-2xl
                transition

                ${
                  location.pathname === menu.path
                  ? "bg-white/20 text-white"
                  : "text-gray-300 hover:text-white"
                }
              `}
            >

              {menu.name}

            </Link>

          ))}

        </div>

        {/* PROFILE */}
        <div className="
  flex
  items-center
  gap-4
">

  {/* LOGOUT */}
  <button

    onClick={() => {

      localStorage.removeItem("token")

      window.location.href =
        "/login"

    }}

    className="
      px-5 py-2

      rounded-2xl

      bg-gray-300/20
      text-red-400

      hover:bg-red-500
      hover:text-white

      transition
    "
  >

    Logout

  </button>

  {/* PROFILE */}
  <div className="
    w-12 h-12
    rounded-full

    bg-white/10

    flex
    items-center
    justify-center

    backdrop-blur-xl
  ">
<img

  src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"

  className="
    w-full
    h-full

    object-cover
    rounded-full
  "

/>

  </div>

</div>

      </div>

      {/* STATS */}
      <div className="
        grid
        grid-cols-3
        gap-5
        mt-10
      ">

        <div className="
          bg-white/10
          rounded-3xl
          p-6
        ">

         <p className="text-gray-300">
            Total Order
          </p>

          <h1 className="
            text-5xl
            font-bold
            mt-4
          ">
            {orders.length}
          </h1>

        </div>

        <div className="
          bg-white/10
          rounded-3xl
          p-6
        ">

          <p className="text-gray-300">
            Total Menu
          </p>

          <h1 className="
            text-5xl
            font-bold
            mt-4
          ">
            {menusData.length}
          </h1>

        </div>

        <div className="
          bg-white/10
          rounded-3xl
          p-6
        ">

          <p className="text-gray-300">
            Total Meja
          </p>

          <h1 className="
            text-5xl
            font-bold
            mt-4
          ">
            {tables.length}
          </h1>

        </div>

      </div>

    </div>

    {/* CONTENT */}
    <div className="mt-8">

      {children}

    </div>

  </div>

)
 
}