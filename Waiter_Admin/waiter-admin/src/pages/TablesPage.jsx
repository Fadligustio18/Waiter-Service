import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import api from "../services/api"

export default function TablesPage() {

  const [tables, setTables] = useState([])
  const [currentPage, setCurrentPage] =
  useState(1)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [tableName, setTableName] = useState("")
  useEffect(() => {

  getTables()

}, [])

async function getTables() {

  try {

    const response = await api.get("/api/location")

    console.log(response.data)

    setTables(response.data)

  } catch (error) {

    console.log(error)

  }

}

async function deleteTable(id) {

  const result = await Swal.fire({

    title: "Hapus meja?",

    text: "Data meja akan dihapus permanen",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ef4444",

    cancelButtonColor: "#9ca3af",

    confirmButtonText: "Ya, hapus",

    cancelButtonText: "Batal",

    background: "#fff",

    color: "#111"

  })

  if (!result.isConfirmed) return

  try {

    await api.delete(`/api/location/${id}`)

    // REFRESH
    getTables()

    // SUCCESS
    Swal.fire({

      icon: "success",

      title: "Deleted!",

      text: "Meja berhasil dihapus",

      confirmButtonColor: "#ef4444",

      timer: 2000,

      showConfirmButton: false

    })

  } catch (error) {

    console.log(error)

    Swal.fire({

      icon: "error",

      title: "Oops...",

      text: "Meja gagal dihapus",

      confirmButtonColor: "#ef4444"

    })

  }

}

async function createTable() {

  try {

    await api.post("/api/location", {

      id: 0,

      name: tableName

    })

    // REFRESH
    getTables()

    // RESET
    setTableName("")
Swal.fire({

  icon: "success",

  title: "Berhasil",

  text: "Meja berhasil ditambah",

  confirmButtonColor: "#ef4444",

  background: "#fff",

  color: "#111",

  timer: 2000,

  showConfirmButton: false

})

  } catch (error) {

    console.log(error)

Swal.fire({

  icon: "error",

  title: "Oops...",

  text: "Gagal tambah meja",

  confirmButtonColor: "#ef4444"

})

  }

}

  function getStatusColor(status) {

    if (status === "occupied") {
      return "bg-red-100 text-red-600"
    }

    if (status === "available") {
      return "bg-green-100 text-green-600"
    }

    return "bg-yellow-100 text-yellow-600"
  }


  const tablesPerPage = 10

const lastIndex =
  currentPage * tablesPerPage

const firstIndex =
  lastIndex - tablesPerPage

const currentTables =
  tables.slice(firstIndex, lastIndex)

const totalPages =
  Math.ceil(tables.length / tablesPerPage)

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

  <button

    onClick={() => setIsAddOpen(true)}

    className="
      bg-red-500 text-white

      px-6 py-4
      rounded-2xl
      font-bold

      hover:bg-red-600
      hover:scale-105
   text-lg

    shadow-lg
      transition
      duration-300
    "
  >

    + Tambah Meja

  </button>

</div>
      {/* ADD MODAL */}
{isAddOpen && (

  <motion.div

    initial={{ opacity: 0 }}

    animate={{ opacity: 1 }}

    exit={{ opacity: 0 }}

    className="
      fixed inset-0
      bg-black/40
      backdrop-blur-sm

      flex items-center justify-center

      z-50
    "
  >

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.8,
        y: 50
      }}

      animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }}

      transition={{
        duration: 0.3
      }}

      className="
        bg-white
        w-full
        max-w-xl
        rounded-3xl
        p-8
        shadow-2xl
      "
    >

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            Tambah Meja
          </h2>

          <p className="text-gray-500 mt-1">
            Tambahkan meja baru restoran
          </p>

        </div>

        <button

          onClick={() => setIsAddOpen(false)}

          className="text-3xl"
        >

          ✕

        </button>

      </div>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Add Table Name"

        value={tableName}

        onChange={(e) => setTableName(e.target.value)}

        className="
          w-full
          bg-gray-100
          p-5
          rounded-2xl
          outline-none

          focus:ring-4
          focus:ring-red-200

          transition
        "
      />

      {/* BUTTON */}
      <button

        onClick={() => {

          createTable()

          setIsAddOpen(false)

        }}

        className="
          w-full
          mt-6

          bg-blue-500
          text-white

          p-5
          rounded-2xl
          font-bold

          hover:bg-red-600
          hover:scale-[1.02]

          transition
          duration-300
        "
      >

        + Tambah Meja

      </button>

    </motion.div>

  </motion.div>

)}
      



      {/* TABLE GRID */}
      <div className="flex flex-col gap">

        {currentTables.map(table => (
<motion.div

  initial={{ opacity: 0, y: 30 }}

  animate={{ opacity: 1, y: 0 }}

  transition={{ duration: 0.3 }}

  className="
    bg-white rounded-3xl p-5 shadow
    mb-5
    hover:scale-[1.01]
    hover:shadow-2xl
    transition
    duration-300
       flex items-center justify-between
       
  "
>


    <div>

      <h2 className="text-2xl font-bold">
        {table.name}
      </h2>

    </div>

        <button

        onClick={() => deleteTable(table.id)}

        className="
          bg-red-600 text-white
          px-5 py-3 rounded-2xl

          hover:bg-red-600
          hover:scale-105

          transition
          duration-300
        "
      >

        Delete

      </button>

  </motion.div>

))}

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
          ? "bg-red-500 text-white"
          : "bg-white text-black"
        }
      `}
    >

      {index + 1}

    </button>

  ))}

</div>

      </div>

    </div>
  )
}