import { Route, Routes } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import Toaster from "./components/common/Toaster"

function App() {

  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
      </Routes>
    </div>
  )
}

export default App
