import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import api from "../services/api"

export default function OrdersPage() {
  const [search, setSearch] =
  useState("")
const [selectedOrder, setSelectedOrder] =
  useState(null)
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] =
  useState(1)


  useEffect(() => {

    getOrders()

  }, [])

   async function getOrderDetail(id) {

  try {

    const response =
      await api.get(`/api/order/${id}`)

    console.log(response.data)

    setSelectedOrder(response.data)

  } catch (error) {

    console.log(error)

  }

}

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

  const value = status?.toLowerCase()

  if (value === "pending") {
    return "bg-yellow-100 text-yellow-700"
  }

  if (value === "cooking") {
    return "bg-blue-100 text-blue-700"
  }

  if (value === "ready") {
    return "bg-green-100 text-green-700"
  }

  if (value === "paid") {
    return "bg-gray-200 text-gray-700"
  }

  return "bg-gray-100 text-gray-600"

}
const totalOrders = orders.length

const pendingOrders = orders.filter(
  order => order.StatusName?.toLowerCase() === "pending"
).length

const cookingOrders = orders.filter(
  order => order.StatusName?.toLowerCase() === "cooking"
).length

const readyOrders = orders.filter(
  order => order.StatusName?.toLowerCase() === "ready"
).length

const doneOrders = orders.filter(
  order => order.StatusName?.toLowerCase() === "done"
).length


const ordersPerPage = 10

const lastIndex =
  currentPage * ordersPerPage

const firstIndex =
  lastIndex - ordersPerPage

const currentOrders =
  orders.slice(firstIndex, lastIndex)

const totalPages =
  Math.ceil(orders.length / ordersPerPage)

const filteredOrders =
  (currentOrders || [])
    .filter(order =>

      order.CustomerName
        ?.toLowerCase()

        .includes(
          search.toLowerCase()
        )

      ||

      order.TableName
        ?.toLowerCase()

        .includes(
          search.toLowerCase()
        )

    )
  return (
    <>
    <div className="flex flex-col gap-5">

      {/* HEADER */}
<div className="flex justify-between items-center mb-10">

  <div>

    <h1 className="text-4xl font-bold">
      History Orders
    </h1>

    <p className="text-gray-500 mt-2">
      Lihat riwayat pesanan dan detailnya
    </p>

  </div>



</div>

      <div className="grid grid-cols-5 gap-5">

  <div className="bg-white p-6 rounded-3xl shadow">

    <p className="text-gray-500">
      Total Orders
    </p>

    <h1 className="text-4xl font-bold mt-2">
      {totalOrders}
    </h1>

  </div>

  <div className="bg-yellow-100 p-6 rounded-3xl shadow">

    <p className="text-yellow-700">
      Pending
    </p>

    <h1 className="text-4xl font-bold mt-2 text-yellow-700">
      {pendingOrders}
    </h1>

  </div>

  <div className="bg-blue-100 p-6 rounded-3xl shadow">

    <p className="text-blue-700">
      Cooking
    </p>

    <h1 className="text-4xl font-bold mt-2 text-blue-700">
      {cookingOrders}
    </h1>

  </div>

  <div className="bg-green-100 p-6 rounded-3xl shadow">

    <p className="text-green-700">
      Ready
    </p>

    <h1 className="text-4xl font-bold mt-2 text-green-700">
      {readyOrders}
    </h1>

  </div>

  <div className="bg-gray-200 p-6 rounded-3xl shadow">

    <p className="text-gray-700">
      Done
    </p>

    <h1 className="text-4xl font-bold mt-2 text-gray-700">
      {doneOrders}
    </h1>

  </div>

</div>

{/* SEARCH */}
<div className="mb-8">

  <input

    type="text"

    placeholder="Cari pesanan..."

    value={search}

    onChange={(e) =>
      setSearch(e.target.value)
    }

    className="
      w-full

      bg-white

      p-4

      rounded-2xl

      shadow

      outline-none
    "
  />

</div>

   {filteredOrders.map(order =>  (

  <motion.div
    onClick={() => getOrderDetail(order.Id)}
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
    {selectedOrder && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-[500px] rounded-3xl p-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Order #{selectedOrder.order.Id}
        </h2>

        <button

          onClick={() => setSelectedOrder(null)}

          className="
            bg-red-500 text-white
            px-4 py-2 rounded-2xl
          "
        >

          Close

        </button>

      </div>

      <div className="space-y-2 mb-6">

        <p>
          <span className="font-bold">
            Customer:
          </span>

          {" "}
          {selectedOrder.order.CustomerName}
        </p>

        <p>
          <span className="font-bold">
            Table:
          </span>

          {" "}
          {selectedOrder.order.LocationName}
        </p>

        <p>
          <span className="font-bold">
            Waiter:
          </span>

          {" "}
          {selectedOrder.order.WaiterName}
        </p>

      </div>

      <div className="flex flex-col gap-3">

        {selectedOrder.items?.map(item => (

          <div

            key={item.id}

            className="
              bg-gray-100
              rounded-2xl
              p-4

              flex
              justify-between
            "
          >

            <div>

              <h3 className="font-bold">
                {item.MenuName}
              </h3>

              <p className="text-gray-500">
                Qty: {item.Quantity}
              </p>

            </div>

            <h2 className="font-bold">

              Rp {item.PriceAtOrder}

            </h2>

          </div>

        ))}

      </div>



    </div>
    

  </div>
  

  

  )}
  <div className="
  flex
  justify-center
  items-center
  gap-3
  mt-8
">

  {[...Array(totalPages)].map((_, index) => (

    <button

      key={index}

      onClick={() => setCurrentPage(index + 1)}

      className={`
        px-5 py-3
        rounded-2xl
        font-bold

        transition

        ${currentPage === index + 1
          ? "bg-orange-500 text-white"
          : "bg-white text-black"
        }
      `}
    >

      {index + 1}

    </button>

  ))}

</div>
  </>
  )
}