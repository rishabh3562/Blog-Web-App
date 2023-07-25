import Topbar from "./Components/topBar/Topbar";
import Homepage from "../src/pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context";
function App() {
  const { user } = useContext(Context);
  // console.log(`user in app.js`, user);

  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>

          <Route exact path="/" element={<Homepage />} />
          <Route path="/register" element={user ? <Homepage /> : <Register />} />
          <Route path="/login" element={user ? <Homepage /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Login />} />
          <Route path="/settings" element={user ? <Settings /> : <Login />} />
          <Route path="/posts" element={<Homepage />} />
          <Route path="/post/:id" element={<Single />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
