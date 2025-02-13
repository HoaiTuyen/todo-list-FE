import { useContext, useEffect, useState } from "react";
import { getTodo, createTodo } from "../util/api";
import { notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";

const TodoPage = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const allTodo = await getTodo();
        if (!allTodo?.message) {
          setTodo(allTodo);
        } else {
          notification.error({
            message: "Un Authorized",
            description: allTodo?.message,
          });
          navigate("/login");
        }
      } catch (err) {
        notification.error({
          message: "Error",
          description: "Failed to fetch todos.",
        });
      }
    };

    fetchTodo();
  }, []);

  const fetchAddTodo = async () => {
    if (newTodo.trim() === "") return;
    try {
      const addTodo = await createTodo(newTodo);
      console.log(addTodo);

      setTodo((prevTodo) => [...prevTodo, addTodo]);
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Ngăn chặn reload trang
          fetchAddTodo(); // Gọi hàm thêm todo
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todo.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default TodoPage;
