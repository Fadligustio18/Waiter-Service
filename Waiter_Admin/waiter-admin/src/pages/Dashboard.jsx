export default function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-5 mt-8">

        <div className="bg-white rounded-2xl p-5 shadow">
          <h2 className="text-gray-500">
            Total Order
          </h2>

          <p className="text-3xl font-bold mt-3">
            120
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <h2 className="text-gray-500">
            Total Menu
          </h2>

          <p className="text-3xl font-bold mt-3">
            35
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <h2 className="text-gray-500">
            Pendapatan
          </h2>

          <p className="text-3xl font-bold mt-3">
            Rp 5JT
          </p>
        </div>

      </div>

    </div>
  )
}