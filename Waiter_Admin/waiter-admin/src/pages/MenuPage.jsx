import { useEffect, useState } from "react"
import { motion }from "framer-motion"
import api from "../services/api"
import { BASE_URL }from "../constants/config"

export default function MenuPage() {

const [menus, setMenus] = useState([])
const [currentPage, setCurrentPage] =
  useState(1)
const itemsPerPage = 10
const [menuName, setMenuName] = useState("")
const [menuPrice, setMenuPrice] = useState("")
const [menuCategory, setMenuCategory] =
  useState("Makanan")
const [menuImage, setMenuImage] =
  useState(null)
const [previewImage, setPreviewImage] =
  useState("")
  const [search, setSearch] =
  useState("")
const [editingId, setEditingId] =
  useState(null)
const [showModal, setShowModal] =
  useState(false)


  useEffect(() => {

  getMenus()

}, [])

function openEdit(menu) {

  setEditingId(menu.id)

  setMenuName(menu.name)

  setMenuPrice(menu.price)

  setMenuCategory(
    menu.typeName === "Food"
      ? "Makanan"
      : "Minuman"
  )

  setPreviewImage(
    `${BASE_URL}${menu.imageUrl}`
  )

  setShowModal(true)

}

async function getMenus() {

  try {

    const response =
      await api.get("/api/menu")

    setMenus(response.data)

  } catch (error) {

    console.log(error)

  }

}

async function createMenu() {

  try {

    const formData = new FormData()

    formData.append("name", menuName)

    formData.append(
      "price",
      Number(menuPrice)
    )

    formData.append(
      "typeId",
      menuCategory === "Makanan"
        ? 1
        : 2
    )

   formData.append(
  "image",
  menuImage
)

    await api.post(
      "/api/menu",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    )

    getMenus()

    setShowModal(false)

    setMenuName("")
    setMenuPrice("")
    setMenuCategory("Makanan")
    setMenuImage(null)

  } catch (error) {

    console.log(error)

  }

}

async function deleteMenu(id) {

  try {

    await api.delete(`/api/menu/${id}`)

    getMenus()

  } catch (error) {

    console.log(error)

  }

}

async function updateMenu() {

  try {

    await api.put(

      `/api/menu/name/${editingId}`,

      {
        name: menuName
      }

    )

    await api.put(

      `/api/menu/price/${editingId}`,

      {
        price: Number(menuPrice)
      }

    )

    getMenus()

    setShowModal(false)

    setEditingId(null)

  } catch (error) {

    console.log(error)

  }

}

const lastIndex =
  currentPage * itemsPerPage

const firstIndex =
  lastIndex - itemsPerPage

const currentMenus =
  menus.slice(firstIndex, lastIndex)

const totalPages =
  Math.ceil(
    menus.length / itemsPerPage
  )

const filteredMenus =
  menus.filter(menu =>

    menu.name
      ?.toLowerCase()

      .includes(
        search.toLowerCase()
      )

  )

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

   <button

  onClick={() => setShowModal(true)}

  className="
    px-6
    py-4
    rounded-2xl
 hover:bg-red-600
    
    bg-red-500 text-white
    font-bold
    text-lg

    shadow-lg

    hover:scale-105
    transition duration-300
  "
>

  + Tambah Menu

</button>

      </div>

      {/* SEARCH */}
      <div className="mb-8">

     

      </div>

      {/* SEARCH */}
{/* SEARCH */}
<div className="mb-8">

  <input

    type="text"

    placeholder="Cari menu..."

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
      {/* GRID MENU */}
      <div className="flex flex-col gap-5">

        {filteredMenus.map((menu, index) =>(

  <motion.div

  key={menu.id}

  initial={{
    opacity: 0,
    y: 30
  }}

  animate={{
    opacity: 1,
    y: 0
  }}

  transition={{

    duration: 0.4,

    delay: index * 0.08

  }}

  className="
    bg-white
    rounded-3xl
    shadow

    flex
    items-center

    hover:scale-[1.01]
    transition
  "
>

  {/* IMAGE */}
  <img
    src={`${BASE_URL}${menu.imageUrl}`}
    
          className="
        w-40
        h-40

        object-cover

        rounded-3xl

        m-4

        flex-shrink-0
      "
  />

  {/* CONTENT */}
  <div className="flex-1 p-6">

    <div className="flex justify-between">

      <div>

        <h1 className="text-3xl font-bold">
          {menu.name}
        </h1>

        <p className="text-gray-500 mt-1">
          {menu.typeName}
        </p>

      </div>

      <span className="
        bg-gray-100
        px-4 py-2
        rounded-2xl
        h-fit
      ">
        #{menu.id}
      </span>

    </div>

    <div className="
      flex
      justify-between
      items-end
      mt-8
    ">

      <h1 className="text-4xl font-bold">
        Rp {menu.price}
      </h1>

      <div className="flex gap-3">

        <button
          onClick={() => openEdit(menu)}
          className="
            bg-yellow-400
            px-6 py-3
            rounded-2xl
            font-bold
          "
        >
          Edit
        </button>

        <button
          onClick={() => deleteMenu(menu.id)}
          className="
            bg-red-500
            text-white
            px-6 py-3
            rounded-2xl
            font-bold
          "
        >
          Delete
        </button>

      </div>

    </div>

  </div>

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
          ? "bg-orange-500 text-white"
          : "bg-white text-black"
        }
      `}
    >

      {index + 1}

    </button>

  ))}

</div>
      </div>

      {showModal && (

<div className="
  fixed inset-0
  bg-black/40

  flex
  items-center
  justify-center

  z-50
">

  <div className="
    bg-white
    w-[500px]

    rounded-3xl
    p-8
  ">

    <div className="flex justify-between items-center mb-8">

      <h1 className="text-3xl font-bold">
        Tambah Menu
      </h1>

      <button
        onClick={() => setShowModal(false)}
      >
        ✕
      </button>

    </div>

    <div className="flex flex-col gap-5">
     

      <input

        type="text"

        placeholder="Nama menu"

        value={menuName}

        onChange={(e) =>
          setMenuName(e.target.value)
        }

        className="
          bg-gray-100
          p-4
          rounded-2xl
          outline-none
        "
      />

         <input
          type="file"

  accept="image/*"

  onChange={(e) => {

    const file = e.target.files[0]

    setMenuImage(file)

    setPreviewImage(
      URL.createObjectURL(file)
    )

  }}
          className="w-full bg-white p-4 rounded-2xl shadow outline-none"
        />

      <input

        type="number"

        placeholder="Harga"

        value={menuPrice}

        onChange={(e) =>
          setMenuPrice(e.target.value)
        }

        className="
          bg-gray-100
          p-4
          rounded-2xl
          outline-none
        "
      />
     

{previewImage && (

  <img

   src={previewImage}

    className="
      w-full
      h-52
      object-cover

      rounded-2xl
    "
  />

)}
      <select
      
          
        value={menuCategory}

        onChange={(e) =>
          setMenuCategory(e.target.value)
        }

        className="
          bg-gray-100
          p-4
          rounded-2xl
          outline-none
        "
      >

        <option>
          Makanan
        </option>

        <option>
          Minuman
        </option>

      </select>

      <button
       onClick={
  editingId
    ? updateMenu
    : createMenu
}
        className="
          bg-orange-500
          text-white

          p-4
          rounded-2xl

          font-bold
        "
      >

        Simpan Menu

      </button>

    </div>

  </div>

</div>

)}

    </div>
  )
}