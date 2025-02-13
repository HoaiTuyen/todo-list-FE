import React, { useContext, useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";

import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth.context";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <MailOutlined />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to={"/todos"}>Todo</Link>,
            key: "todo",
            icon: <MailOutlined />,
          },
        ]
      : []),

    {
      label: `WelCome - ${auth.user.name}`,
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            ...(auth.isAuthenticated
              ? [
                  {
                    label: (
                      <span
                        onClick={() => {
                          localStorage.clear("access_token");
                          setAuth({
                            isAuthenticated: false,
                            user: {
                              email: "",
                              name: "",
                            },
                          });
                          navigate("/");
                        }}
                      >
                        Đăng Xuất
                      </span>
                    ),
                    key: "logout",
                  },
                ]
              : [
                  { label: <Link to={"/login"}>Đăng Nhập</Link>, key: "login" },
                ]),
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
