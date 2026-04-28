import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import LogIn from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader.js";
import ProtectedRoute from "./components/protectedRoutes";
import { useSelector } from "react-redux";

function App() {
  const loader = useSelector((state) => state.loaderReducer);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route> */}
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;  