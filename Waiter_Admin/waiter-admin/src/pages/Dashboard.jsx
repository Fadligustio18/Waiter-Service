import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const data = [
  {
    name: "Sen",
    total: 4000
  },
  {
    name: "Sel",
    total: 3000
  },
  {
    name: "Rab",
    total: 5000
  },
  {
    name: "Kam",
    total: 2780
  },
  {
    name: "Jum",
    total: 1890
  },
  {
    name: "Sab",
    total: 6390
  },
]

export default function Dashboard() {

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
            120
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <p className="text-gray-500">
            Total Menu
          </p>

          <h2 className="text-4xl font-bold mt-4">
            35
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <p className="text-gray-500">
            Meja Aktif
          </p>

          <h2 className="text-4xl font-bold mt-4">
            12
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <p className="text-gray-500">
            Pendapatan
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Rp 8JT
          </h2>

        </div>

      </div>

      {/* CHART */}
      <div className="bg-white rounded-3xl p-6 shadow mb-10">

        <div className="mb-6">

          <h2 className="text-2xl font-bold">
            Statistik Penjualan
          </h2>

        </div>

        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={data}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-3xl p-6 shadow">

        <h2 className="text-2xl font-bold mb-6">
          Recent Orders
        </h2>

        <div className="flex flex-col gap-4">

          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-2xl">

            <div>

              <h3 className="font-bold">
                Nasi Goreng
              </h3>

              <p className="text-gray-500">
                Table 2
              </p>

            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
              Selesai
            </span>

          </div>

          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-2xl">

            <div>

              <h3 className="font-bold">
                Mie Ayam
              </h3>

              <p className="text-gray-500">
                Table 5
              </p>

            </div>

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl">
              Diproses
            </span>

          </div>

        </div>

      </div>

    </div>
  )
}