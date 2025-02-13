import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { useContext, useEffect } from "react";
import axios from "./util/axios.customize";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";


function App() {
  const {setAuth, loading, setLoading} = useContext(AuthContext);
  useEffect(() => {
    const fetchApi = async() => {
      setLoading(true);
      const res = await axios.get(`/v1/api/account`);
      if(res && !res.message) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email,
            name: res.name,
          },
        })
      }
      setLoading(false);
    }
    fetchApi();
  }, [])
  return (
    <div>
      {loading === true ? (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default App;
