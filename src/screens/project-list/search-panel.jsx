import React, { memo, useEffect, useState } from 'react'

const SearchPanel = memo((props) => {
  const { param, setParam, users } = props

  return (
    <form>
      <div>
        <input 
          type="text" value={param.name} onChange={e => setParam({
            ...param,
            name: e.target.value
          })} />
        <select value={param.name} onChange={e => setParam({
          ...param,
          personId: e.target.value
        })}>
          <option value="">负责人</option>
          {
            users.map(user => {
              return <option value={user.id} key={user.id}>{user.name}</option>
            })
          }
        </select>
      </div>
    </form>
  )
})

export default SearchPanel