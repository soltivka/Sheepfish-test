import "./App.css";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout/Layout";
import Products from "./pages/Products/Products";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import Routing from "./routing";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={Routing.Products} element={<Products />} />
          <Route path={Routing.CreateProduct} element={<CreateProduct />} />
          <Route path="*" element={<Navigate to={Routing.Products} replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
