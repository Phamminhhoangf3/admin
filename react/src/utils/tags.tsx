import { Tag } from "antd";

export const tagActive = (active) => {
  if (active) return <Tag color="success">Hoạt động</Tag>;
  return <Tag color="default">Ngừng hoạt động</Tag>;
};
