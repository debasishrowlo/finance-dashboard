import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SidebarLayout from "./layouts/SidebarLayout"

import Overview from "./pages/Overview"
import Pots from "./pages/Pots"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Login</div>} />
        <Route element={<SidebarLayout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/pots" element={<Pots />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
