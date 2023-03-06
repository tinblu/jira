import * as qs from "qs"
import { useEffect, useState } from "react"

import { cleanObject, useDebounce, useMount } from "utils"

import List from "./list"
import SearchPanel from "./search-panel"
import { PrajectListWrapper } from "./style"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [ param, setParam ] = useState({
    name: '',
    personId: '',
  })
  const [ list, setList ] = useState([])
  const [ users, setUsers ] = useState([])
  const debouncedParam = useDebounce(param, 2000)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if(response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if(response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return <div>
    <PrajectListWrapper>
      <SearchPanel users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </PrajectListWrapper>
  </div>
}