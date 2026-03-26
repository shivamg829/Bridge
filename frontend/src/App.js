import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home'
import LogIn from "./pages/login/login";
import SignUp from "./pages/signup/signup";
function App() {
  return (
     <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<LogIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;
