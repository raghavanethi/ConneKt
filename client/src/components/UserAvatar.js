import { Avatar } from "@mui/material";
import React from "react";

const UserAvatar = ({ username, height, width }) => {
  const accessKey = "RnMBlKTRwaMfgYVYJBxss9saIAdU60J4tUGv7sbfO30";
  const avatarUrl = `https://source.unsplash.com/150x150/?face&${username}`;

  return (
    <Avatar
      sx={{
        height: height,
        width: width,
        backgroundColor: "lightgray",
      }}
      src={avatarUrl}
    />
  );
};

export default UserAvatar;
