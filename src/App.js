import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { useEffect } from "react";
import axios from "./util/axios.customize";


function App() {
  useEffect(() => {
    const fetchApi = async() => {
      const res = await axios.get(`/v1/api/`);
      console.log(res);
      
    }
    fetchApi();
  }, [])
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
