import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users/>} />
      </Routes>
    </Layout>
  );
}
/*
<Route exact path="/functions" component={Functions} />
  <Route path="/functions/:functionName" component={FunctionDetails} />
*/

export default App;
