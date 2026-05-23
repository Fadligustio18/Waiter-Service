import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import api from "../services/api"

export default function UsersPage() {
const [search, setSearch] = useState("")
const [users, setUsers] = useState([])
const [name, setName] = useState("")
const [password, setPassword] = useState("")
const [roleId, setRoleId] = useState(0)
const [roleName, setRoleName] = useState("")
const [editName, setEditName] = useState("")
const [editPassword, setEditPassword] = useState("")
const [editRoleId, setEditRoleId] = useState(0)
const [editRoleName, setEditRoleName] = useState("")
const [editId, setEditId] = useState(null)
const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {

    getUsers()

  }, [])

  async function createUser() {

  try {

    await api.post("/api/user", {

      id: 0,

      name: name,

      password: password,

      roleId: parseInt(roleId),

      roleName: roleName

    })

    // REFRESH DATA
    getUsers()

    // RESET FORM
    setName("")
    setPassword("")
    setRoleId(0)
    setRoleName("")
   
    Swal.fire({

  icon: "success",

  title: "Berhasil",

  text: "User berhasil ditambah",

  confirmButtonColor: "#111827",

  timer: 2000,

  showConfirmButton: false

})

  } catch (error) {

    console.log(error)

   Swal.fire({

  icon: "error",

  title: "Oops...",

  text: "Gagal tambah user",

  confirmButtonColor: "#111827"

})

  }

}

async function deleteUser(id) {

  const result = await Swal.fire({

    title: "Hapus user?",

    text: "Data user akan dihapus permanen",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ef4444",

    cancelButtonColor: "#9ca3af",

    confirmButtonText: "Ya, hapus",

    cancelButtonText: "Batal"

  })

  if (!result.isConfirmed) return

  try {

    await api.delete(`/api/user/${id}`)

    getUsers()

    Swal.fire({

      icon: "success",

      title: "Deleted!",

      text: "User berhasil dihapus",

      confirmButtonColor: "#111827",

      timer: 2000,

      showConfirmButton: false

    })

  } catch (error) {

    console.log(error)

    Swal.fire({

      icon: "error",

      title: "Oops...",

      text: "Gagal hapus user",

      confirmButtonColor: "#111827"

    })

  }

}
function editUser(user) {

  setEditId(user.id)

  setEditName(user.name)

  setEditPassword(user.password)

  setEditRoleId(user.roleId)

  setEditRoleName(user.roleName)

  setIsEditOpen(true)

}

async function updateUser() {

  try {

    await api.put(`/api/user/${editId}`, {

      id: editId,

      name: editName,
password: editPassword,
roleId: parseInt(editRoleId),
roleName: editRoleName

    

    })

    // REFRESH
    getUsers()
    setIsEditOpen(false)
   
   
   Swal.fire({

  icon: "success",

  title: "Updated!",

  text: "User berhasil diupdate",

  confirmButtonColor: "#111827",

  timer: 2000,

  showConfirmButton: false

})

  } catch (error) {

    console.log(error)

  Swal.fire({

  icon: "error",

  title: "Oops...",

  text: "Gagal update user",

  confirmButtonColor: "#111827"

})

  }

}

  async function getUsers() {

  try {

    const response = await api.get("/api/user")

    console.log(response.data)

   

  setUsers(response.data)

  } catch (error) {

    console.log(error)

  }

}

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

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-5 mb-10">

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-gray-500">
            Total Users
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {users.length}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-gray-500">
            Waiters
          </p>

          <h2 className="text-4xl font-bold mt-4">
          {
           users.filter(
          user => user.roleName === "Waiter"
          ).length
          }
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-gray-500">
            Chefs
          </p>

          <h2 className="text-4xl font-bold mt-4">
          {
          users.filter(
          user => user.roleName === "Chef"
          ).length
          }
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-gray-500">
            Cashiers
          </p>

          <h2 className="text-4xl font-bold mt-4">
          {
          users.filter(
          user => user.roleName === "Cashier"
          ).length
          }     
          </h2>

        </div>

      </div>

      {/* CREATE USER */}
    
<div className="bg-white rounded-3xl shadow p-6 mb-8">

  <h2 className="text-2xl font-bold mb-6">
    Tambah User
  </h2>

  <div className="grid grid-cols-4 gap-4">

    {/* NAME */}
    <input
      type="text"
      placeholder="Username"

      value={name}
      onChange={(e) => setName(e.target.value)}

      className="bg-gray-100 p-4 rounded-2xl outline-none"
    />

    {/* PASSWORD */}
    <input
      type="text"
      placeholder="Password"

      value={password}
      onChange={(e) => setPassword(e.target.value)}

      className="bg-gray-100 p-4 rounded-2xl outline-none"
    />

    {/* ROLE */}
    <select

      value={roleName}

      onChange={(e) => {

        setRoleName(e.target.value)

        if (e.target.value === "Admin") {
          setRoleId(1)
        }

        if (e.target.value === "Waiter") {
          setRoleId(2)
        }

        if (e.target.value === "Chef") {
          setRoleId(4)
        }

        if (e.target.value === "Cashier") {
          setRoleId(3)
        }

      }}

      className="bg-gray-100 p-4 rounded-2xl outline-none"
    >

      <option value="">
        Pilih Role
      </option>

      <option value="Admin">
        Admin
      </option>

      <option value="Waiter">
        Waiter
      </option>

      <option value="Chef">
        Chef
      </option>

      <option value="Cashier">
        Cashier
      </option>

    </select>

    {/* BUTTON */}
    <button
    onClick={createUser}

      className="bg-black text-white rounded-2xl font-bold"
    >

      Tambah

    </button>

  </div>

</div>

      {/* SEARCH */}
      <div className="mb-8">

            <input
        type="text"
        placeholder="Cari user..."

        value={search}
        onChange={(e) => setSearch(e.target.value)}

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
       {users
  .filter(user =>

    user.name
      .toLowerCase()
      .includes(search.toLowerCase())

  )
  .map(user => (

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
              {user.password}
            </div>

            <div>

              <span className={`
                px-4 py-2 rounded-xl text-sm font-semibold
           ${getRoleColor(user.roleName)}
              `}>

      {user.roleName}

              </span>

            </div>

            <div className="flex gap-3">

              <button

              onClick={() => editUser(user)}

              className="bg-yellow-400 px-4 py-2 rounded-xl font-semibold"
            >

              Edit

            </button>

              <button

              onClick={() => deleteUser(user.id)}

              className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold"
            >

              Delete

            </button>
            </div>

          </div>

        ))}

      </div>

   {/* EDIT MODAL */}
{isEditOpen && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-lg rounded-3xl p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Update User
        </h2>

        <button

          onClick={() => setIsEditOpen(false)}

          className="text-2xl"
        >

          ✕

        </button>

      </div>

      {/* FORM */}
      <div className="flex flex-col gap-5">

        {/* NAME */}
        <input
          type="text"
          placeholder="Username"

          value={editName}
          onChange={(e) => setEditName(e.target.value)}

          className="bg-gray-100 p-4 rounded-2xl outline-none"
        />

        {/* PASSWORD */}
        <input
          type="text"
          placeholder="Password"

          value={editPassword}
          onChange={(e) => setEditPassword(e.target.value)}

          className="bg-gray-100 p-4 rounded-2xl outline-none"
        />

        {/* ROLE */}
        <select

          value={editRoleName}

          onChange={(e) => {

            setEditRoleName(e.target.value)

            if (e.target.value === "Admin") {
              setEditRoleId(1)
            }

            if (e.target.value === "Waiter") {
              setEditRoleId(2)
            }

            if (e.target.value === "Chef") {
              setEditRoleId(4)
            }

            if (e.target.value === "Cashier") {
              setEditRoleId(3)
            }

          }}

          className="bg-gray-100 p-4 rounded-2xl outline-none"
        >

          <option value="">
            Pilih Role
          </option>

          <option value="Admin">
            Admin
          </option>

          <option value="Waiter">
            Waiter
          </option>

          <option value="Chef">
            Chef
          </option>

          <option value="Cashier">
            Cashier
          </option>

        </select>

        {/* BUTTON */}
        <div className="flex gap-4">

          <button

            onClick={updateUser}

            className="flex-1 bg-yellow-500 text-white p-4 rounded-2xl font-bold"
          >

            Update

          </button>

          <button

            onClick={() => setIsEditOpen(false)}

            className="flex-1 bg-gray-300 p-4 rounded-2xl font-bold"
          >

            Cancel

          </button>

        </div>

      </div>

    </div>

  </div>

)}

    </div>
    
  )
}