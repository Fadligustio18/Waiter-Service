const users = [
  {
    id: 1,
    name: "Admin",
    role: "Admin",
    Password: "admin123"
  },
  {
    id: 2,
    name: "Fadli",
    role: "Waiter",
    Password: "fadli123"
  },
  {
    id: 3,
    name: "Andi",
    role: "Chef",
    Password: "andi123"
  },
  {
    id: 4,
    name: "Budi",
    role: "Cashier",
    Password: "budi123"
  }
]

export default function UsersPage() {

  function getRoleColor(role) {

    if (role === "Admin") {
      return "bg-red-100 text-red-600"
    }

    if (role === "Waiter") {
      return "bg-blue-100 text-blue-600"
    }

    if (role === "Chef") {
      return "bg-yellow-100 text-yellow-700"
    }

    return "bg-green-100 text-green-600"
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Users Management
          </h1>

          <p className="text-gray-500 mt-2">
            Kelola user restoran
          </p>

        </div>

        <button className="bg-black text-white px-5 py-3 rounded-2xl">
          + Tambah User
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-5 mb-10">

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-gray-500">
            Total Users
          </p>

          <h2 className="text-4xl font-bold mt-4">
            24
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-gray-500">
            Waiters
          </p>

          <h2 className="text-4xl font-bold mt-4">
            10
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-gray-500">
            Chefs
          </p>

          <h2 className="text-4xl font-bold mt-4">
            6
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-gray-500">
            Cashiers
          </p>

          <h2 className="text-4xl font-bold mt-4">
            4
          </h2>

        </div>

      </div>

      {/* SEARCH */}
      <div className="mb-8">

        <input
          type="text"
          placeholder="Cari user..."
          className="w-full bg-white p-4 rounded-2xl shadow outline-none"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        {/* HEADER TABLE */}
        <div className="grid grid-cols-5 bg-gray-100 p-5 font-bold">

          <div>ID</div>
          <div>Name</div>
          <div>Password</div>
          <div>Role</div>
          <div>Action</div>

        </div>

        {/* BODY */}
        {users.map(user => (

          <div
            key={user.id}
            className="grid grid-cols-5 p-5 border-t items-center hover:bg-gray-50 transition"
          >

            <div>
              #{user.id}
            </div>

            <div className="font-semibold">
              {user.name}
            </div>

            <div>
              {user.Password}
            </div>

            <div>

              <span className={`
                px-4 py-2 rounded-xl text-sm font-semibold
                ${getRoleColor(user.role)}
              `}>

                {user.role}

              </span>

            </div>

            <div className="flex gap-3">

              <button className="bg-yellow-400 px-4 py-2 rounded-xl font-semibold">
                Edit
              </button>

              <button className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold">
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}