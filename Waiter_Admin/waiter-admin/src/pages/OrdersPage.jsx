const orders = [
  {
    id: 1001,
    customer: "Fadli",
    table: "VIP 01",
    total: 45000,
    status: "pending"
  },
  {
    id: 1002,
    customer: "Andi",
    table: "Table 02",
    total: 78000,
    status: "cooking"
  },
  {
    id: 1003,
    customer: "Budi",
    table: "Family 01",
    total: 120000,
    status: "completed"
  }
]

export default function OrdersPage() {

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
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Orders Management
          </h1>

          <p className="text-gray-500 mt-2">
            Kelola semua pesanan restoran
          </p>

        </div>

      </div>

      {/* FILTER */}
      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Cari pesanan..."
          className="flex-1 bg-white p-4 rounded-2xl shadow outline-none"
        />

        <select className="bg-white px-5 rounded-2xl shadow outline-none">

          <option>All Status</option>
          <option>Pending</option>
          <option>Cooking</option>
          <option>Completed</option>

        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        {/* HEAD */}
        <div className="grid grid-cols-5 bg-gray-100 p-5 font-bold">

          <div>Order ID</div>
          <div>Customer</div>
          <div>Table</div>
          <div>Total</div>
          <div>Status</div>

        </div>

        {/* BODY */}
        {orders.map(order => (

          <div
            key={order.id}
            className="grid grid-cols-5 p-5 border-t items-center hover:bg-gray-50 transition"
          >

            <div className="font-semibold">
              #{order.id}
            </div>

            <div>
              {order.customer}
            </div>

            <div>
              {order.table}
            </div>

            <div className="font-bold">
              Rp {order.total}
            </div>

            <div>

              <span className={`
                px-4 py-2 rounded-xl text-sm font-semibold
                ${getStatusColor(order.status)}
              `}>

                {order.status}

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}