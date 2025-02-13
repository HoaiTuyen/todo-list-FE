import { useEffect, useState } from "react";
import { getTodo, createTodo } from "../util/api";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    const fetchTodo = async () => {
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
