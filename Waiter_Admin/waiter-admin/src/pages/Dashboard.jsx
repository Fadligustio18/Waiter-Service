import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import {
  useEffect,
  useState
} from "react"
import api from "../services/api"


export default function Dashboard() {



const [orders, setOrders] =
  useState([])

const [menus, setMenus] =
  useState([])

const [tables, setTables] =
  useState([])


    useEffect(() => {

  getDashboardData()
  

}, [])

async function getDashboardData() {

  try {

    const orderResponse =
      await api.get("/api/order")
    console.log(orderResponse.data[0])
    setOrders(orderResponse.data)

    console.log(orderResponse.data)

  } catch (error) {

    console.log("ORDER ERROR", error)

  }

  try {

    const menuResponse =
      await api.get("/api/menu")

    setMenus(menuResponse.data)

  } catch (error) {

    console.log("MENU ERROR", error)

  }

  try {

    const tableResponse =
      await api.get("/api/location")

    setTables(tableResponse.data)

  } catch (error) {

    console.log("TABLE ERROR", error)

  }

}
const totalRevenue =
  orders.reduce(

    (total, order) =>

      total +
      (order.totalPrice || 0),

    0

  )

const data = [

  {
    name: "Done",
    total: orders.filter(
      o =>
        o.StatusName === "Done"
    ).length
  },

  {
    name: "Pending",
    total: orders.filter(
      o =>
        o.StatusName === "Pending"
    ).length
  }

]

  return (
    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back Admin 
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-5 mb-10">

        <div className="bg-white rounded-3xl p-6 shadow">

          <p className="text-gray-500">
            Total Order
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {orders.length}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <p className="text-gray-500">
            Total Menu
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {menus.length}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <p className="text-gray-500">
            Meja Aktif
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {tables.length}
          </h2>

        </div>


      </div>

     

   

      </div>

  
  )
}