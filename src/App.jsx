import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OrderListPage from "./pages/OrderListPage";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/orders" element={<OrderListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
