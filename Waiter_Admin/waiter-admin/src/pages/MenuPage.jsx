const menus = [
  {
    id: 1,
    name: "Nasi Goreng",
    category: "Makanan",
    price: 15000,
    image: "https://placehold.co/600x400/orange/white"
  },
  {
    id: 2,
    name: "Mie Ayam",
    category: "Makanan",
    price: 12000,
    image: "https://placehold.co/600x400/red/white"
  },
  {
    id: 3,
    name: "Es Teh",
    category: "Minuman",
    price: 5000,
    image: "https://placehold.co/600x400/blue/white"
  }
]

export default function MenuPage() {

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Menu Management
          </h1>

          <p className="text-gray-500 mt-2">
            Kelola menu restoran
          </p>

        </div>

        <button className="bg-black text-white px-5 py-3 rounded-2xl hover:scale-105 transition">

          + Tambah Menu

        </button>

      </div>

      {/* SEARCH */}
      <div className="mb-8">

        <input
          type="text"
          placeholder="Cari menu..."
          className="w-full bg-white p-4 rounded-2xl shadow outline-none"
        />

      </div>

      {/* GRID MENU */}
      <div className="grid grid-cols-3 gap-6">

        {menus.map(menu => (

          <div
            key={menu.id}
            className="bg-white rounded-3xl overflow-hidden shadow hover:scale-[1.02] transition"
          >

            {/* IMAGE */}
            <img
              src={menu.image}
              className="w-full h-52 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {menu.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {menu.category}
                  </p>

                </div>

                <span className="bg-gray-100 px-3 py-1 rounded-xl text-sm">
                  #{menu.id}
                </span>

              </div>

              <p className="text-3xl font-bold mt-6">
                Rp {menu.price}
              </p>

              {/* BUTTON */}
              <div className="flex gap-3 mt-6">

                <button className="flex-1 bg-yellow-400 py-3 rounded-2xl font-semibold">
                  Edit
                </button>

                <button className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-semibold">
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}