const tables = [
  {
    id: 1,
    name: "VIP 01",
    status: "occupied",
    customer: 4
  },
  {
    id: 2,
    name: "Table 02",
    status: "available",
    customer: 0
  },
  {
    id: 3,
    name: "Family 01",
    status: "occupied",
    customer: 6
  },
  {
    id: 4,
    name: "Outdoor 03",
    status: "reserved",
    customer: 2
  }
]

export default function TablesPage() {

  function getStatusColor(status) {

    if (status === "occupied") {
      return "bg-red-100 text-red-600"
    }

    if (status === "available") {
      return "bg-green-100 text-green-600"
    }

    return "bg-yellow-100 text-yellow-600"
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Table Management
          </h1>

          <p className="text-gray-500 mt-2">
            Kelola meja restoran
          </p>

        </div>

        <button className="bg-black text-white px-5 py-3 rounded-2xl">
          + Tambah Meja
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-5 mb-10">

        <div className="bg-white p-6 rounded-3xl shadow">

          <p className="text-gray-500">
            Total Meja
          </p>

          <h2 className="text-4xl font-bold mt-4">
            24
          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <p className="text-gray-500">
            Meja Aktif
          </p>

          <h2 className="text-4xl font-bold mt-4">
            12
          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <p className="text-gray-500">
            Reserved
          </p>

          <h2 className="text-4xl font-bold mt-4">
            3
          </h2>

        </div>

      </div>

      {/* TABLE GRID */}
      <div className="grid grid-cols-3 gap-6">

        {tables.map(table => (

          <div
            key={table.id}
            className="bg-white rounded-3xl shadow p-6 hover:scale-[1.02] transition"
          >

            {/* TOP */}
            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">
                  {table.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  {table.customer} Customer
                </p>

              </div>

              <span className={`
                px-4 py-2 rounded-xl text-sm font-semibold
                ${getStatusColor(table.status)}
              `}>

                {table.status}

              </span>

            </div>

            {/* BUTTON */}
            <div className="flex gap-3 mt-8">

              <button className="flex-1 bg-yellow-400 py-3 rounded-2xl font-semibold">
                Edit
              </button>

              <button className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-semibold">
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}