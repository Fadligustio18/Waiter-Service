import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import api from "../services/api"

export default function OrdersPage() {

  const [orders, setOrders] = useState([])

  useEffect(() => {

    getOrders()

  }, [])

  async function getOrders() {

    try {

      const response = await api.get("/api/order")

      console.log(response.data)

      setOrders(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  function getStatusColor(status) {

    if (status === "pending") {
      return "bg-yellow-100 text-yellow-700"
    }

    if (status === "cooking") {
      return "bg-blue-100 text-blue-700"
    }

    return "bg-green-100 text-green-700"
  }

  return (

    <div className="flex flex-col gap-5">

   {orders?.map(order => (

  <motion.div

    key={order.Id}

    initial={{ opacity: 0, y: 20 }}

    animate={{ opacity: 1, y: 0 }}

    className="
      bg-white
      rounded-3xl
      p-6
      shadow

      flex
      justify-between
      items-center

      hover:shadow-2xl
      hover:scale-[1.01]

      transition
      duration-300
    "
  >

    {/* LEFT */}
    <div>

      <h2 className="text-2xl font-bold">
        Order #{order.Id}
      </h2>

      <p className="text-gray-500 mt-2">
        Customer: {order.CustomerName}
      </p>

      <p className="text-gray-500">
        Table: {order.TableName}
      </p>

      <p className="text-gray-500">
        Waiter: {order.WaiterName}
      </p>

      <p className="text-gray-400 text-sm mt-2">
        {order.Date}
      </p>

    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-4">

      <span className={`
        px-4 py-2 rounded-2xl font-semibold
        ${getStatusColor(order.StatusName)}
      `}>

        {order.StatusName}

      </span>

    </div>

  </motion.div>

))}
    </div>

  )

}