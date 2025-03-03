import { useEffect, useState } from "react";
import { getTodo, createTodo, deleteTodo, updateTodo } from "../util/api";
import { Button, List, notification, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const TodoPage = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [visiblePopover, setVisiblePopover] = useState({});
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");

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
  const handleDeleteTodo = async (id) => {
    try {
      const result = await deleteTodo(id); // Gọi API xóa todo
      setTodo((prevTodo) => prevTodo.filter((item) => item.id !== id)); // Cập nhật danh sách todo
      notification.success({
        message: "Todo Deleted",
        description: "Successfully deleted the todo.",
      });
      window.location.reload();
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Failed to delete todo.",
      });
    }
  };
  const handleVisibleChange = (id) => {
    setVisiblePopover((prev) => ({
      ...prev,
      [id]: !prev[id], // Chuyển đổi trạng thái hiển thị cho item tương ứng
    }));
  };
  const handleEdit = (item) => {
    setEditingTodo(item);
    setEditTitle(item.title);
  };
  const handleUpdate = async (id) => {
    if (!editTitle.trim()) return;
    try {
      const res = await updateTodo(id, { title: editTitle });
      console.log(res);

      setTodo((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, title: res.title } : item
        )
      );
      setEditingTodo(null);
      setEditTitle("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1 className="center_h1">Todo List</h1>
      <div className="center_from">
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
      </div>
      <List
        style={{ width: "400px" }}
        bordered
        dataSource={todo}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            actions={[
              <Popover
                content={
                  <div>
                    <p>Bạn có chắc muốn xóa không?</p>
                    <Button
                      onClick={() => {
                        handleDeleteTodo(item._id);
                        setVisiblePopover((prev) => ({
                          ...prev,
                          [item._id]: false,
                        }));
                      }}
                    >
                      Có
                    </Button>
                    <Button
                      onClick={() => {
                        setVisiblePopover((prev) => ({
                          ...prev,
                          [item._id]: false,
                        }));
                      }}
                    >
                      Không
                    </Button>
                  </div>
                }
                title="Xác nhận"
                trigger="click"
                open={visiblePopover[item._id]}
                onOpenChange={() => handleVisibleChange(item._id)}
              >
                <Button>Delete</Button>
              </Popover>,
              <Button onClick={() => handleEdit(item)}>Edit</Button>,
            ]}
          >
            {editingTodo && editingTodo._id === item._id ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log("Editing Title:", editTitle);

                    handleUpdate(item._id);
                    window.location.reload();
                  }
                }}
              />
            ) : (
              item.title
            )}
          </List.Item>
        )}
      />
    </div>
  );
};
export default TodoPage;
