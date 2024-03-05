import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NewTodoField } from '../newTodoField'
import './index.css'
import { TodoList } from '../todoList'

export const Main = () => {
  const filterTodos = useSelector((state) => state.todos.filterTodos)
  const [completed, setCompleted] = useState(0)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setCompleted(0)
    setCurrent(0)
    filterTodos.map((todo) => {
      if (todo.completed) {
        return setCompleted((prev) => prev + 1)
      }
      return setCurrent((prev) => prev + 1)
    })
  }, [filterTodos])

  return (
        <div className="container-main">
            <div className="container-todos">
                <div className='counter-container'>
                    <span>completed: {completed}</span>
                    <span>current: {current}</span>
                </div>
                <NewTodoField/>
                <TodoList/>
            </div>
        </div>
  )
}
