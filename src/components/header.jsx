import React, { useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";

import { Menu } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <MailOutlined />,
    },
    {
      label: "Welcome - ",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            { label: <Link to={"/login"}>Đăng Nhập</Link>, key: "login" },
            { label: "Đăng Xuất", key: "logout" },
          ],
        },
      ],
    },
  ];

  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
