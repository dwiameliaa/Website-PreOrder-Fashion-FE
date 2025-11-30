import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/public";
import Home from "./pages/public";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Login /> */}
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>

        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <BrowserRouter> */}

      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
