import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserForm from "./UserForm";
import LoginForm from "./Loginform";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
