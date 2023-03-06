import React, { memo } from "react";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

const List = memo((props: ListProps) => {
  const { list, users } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((e) => {
          return (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>
                {users.find((user) => user.id === e.personId)?.name || "未知"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default List;
