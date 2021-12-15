import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import User from "./pages/User/User";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/user/:id" element={<User/>} />
      </Routes>
    </Layout>
  );
}

export default App;
