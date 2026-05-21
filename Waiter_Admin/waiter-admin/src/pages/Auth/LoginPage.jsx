import { useState } from "react"
import { useNavigate } from "react-router-dom"

import api from "../../services/api"

export default function LoginPage() {

  const navigate = useNavigate()

  // STATE
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // FUNCTION LOGIN
  async function handleLogin() {

    try {

      const response = await api.post("/api/Auth/login", {

        id: 0,

        name: email,

        password: password,

        roleId: 0,

        roleName: ""

      })

      console.log(response.data)

      // SIMPAN TOKEN / LOGIN STATUS
      localStorage.setItem("token", "login-success")

      localStorage.setItem(
  "user",
  JSON.stringify(response.data)
)

      // PINDAH KE DASHBOARD
      navigate("/")

    } catch (error) {

      console.log(error)

      alert("Login gagal")

    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center p-5">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-[30px] p-8 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-white">
            WAITER
          </h1>

          <p className="text-white/80 mt-3">
            Admin Dashboard Login
          </p>

        </div>

        {/* FORM */}
        <div className="flex flex-col gap-5">

          {/* USERNAME */}
          <div>

            <label className="text-white text-sm">
              Username
            </label>

            <input
              type="text"
              placeholder="Masukkan username"

              value={email}
              onChange={(e) => setEmail(e.target.value)}

              className="w-full mt-2 p-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 outline-none"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-white text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"

              value={password}
              onChange={(e) => setPassword(e.target.value)}

              className="w-full mt-2 p-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 outline-none"
            />

          </div>

          {/* BUTTON */}
          <button

            onClick={handleLogin}

            className="bg-white text-black font-bold p-4 rounded-2xl mt-5 hover:scale-[1.02] transition"
          >

            LOGIN

          </button>

        </div>

      </div>

    </div>

  )
}