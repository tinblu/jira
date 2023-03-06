import React, { memo, } from 'react'

const List = memo((props) => {
  const { list, users } = props

  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map(e => {
            return (
              <tr key={e.id}>
                <td >{e.name}</td>
                <td >{users.find(user => user.id === e.personId)?.name || '未知'}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
})

export default List