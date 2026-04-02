import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import LogIn from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoutes";
function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
