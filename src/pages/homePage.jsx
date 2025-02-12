import { CrownOutlined } from "@ant-design/icons";
import { Result } from "antd";

const HomePage = () => {
  return (
    <div>
      <div style={{ padding: 20 }}>
        <Result
          icon={<CrownOutlined />}
          title="Todo List(React/Node.JS) - Bản Quyền Dev Tuien"
        />
      </div>
    </div>
  );
};
export default HomePage;
