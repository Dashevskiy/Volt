import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TodoItem } from '../todoItem'
import './index.css'
import Dropdown from '../dropdown'

export const TodoList = () => {
  const filterTodos = useSelector((state) => state.todos.filterTodos)
  const [selected, setSelected] = useState('all')

  const handleChange = (value) => {
    setSelected(value)
  }

  return (
        <>
            <div className='filter-container'>Filter by
              <Dropdown
                selected={selected}
                setSelected={setSelected}
                handleChange={(value) => handleChange(value)}/>
            </div>
            <ul>
                {
                    filterTodos.map((todo) => {
                      return <TodoItem
                            key={todo.id}
                            {...todo}
                        />
                    })
                }
            </ul>
        </>
  )
}
