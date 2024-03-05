import React, { useEffect, useState } from 'react'
import { string, func } from 'prop-types'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodos } from '../../store/todos'
import { setItem } from '../../helpers/storage'

function Dropdown({ selected, setSelected, handleChange }) {
  const todos = useSelector((state) => state.todos.todos)
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)
  const options = ['all', 'completed', 'current']

  useEffect(() => {
    setItem('filterBy', 'all')
  }, [])

  const onClickByOption = (option) => {
    setItem('filterBy', option)
    setItem('todos', todos)

    // eslint-disable-next-line consistent-return, array-callback-return
    const filterItems = todos.filter((todo) => {
      // eslint-disable-next-line unicorn/prefer-switch
      if (option === 'all') {
        return todos
      // eslint-disable-next-line no-else-return
      } else if (option === 'current') {
        return todo.completed === false
      } else if (option === 'completed') {
        return todo.completed === true
      }
    })

    dispatch(updateTodos({ filterItems }))

    handleChange(option)
    setSelected(option)
    setIsActive(false)
  }

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        {selected}
        <span
          className={`${isActive ? 'triangle-top' : 'triangle-bottom'}`}>
        </span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div key={option}
              onClick={() => onClickByOption(option)}
              className={`dropdown-item ${selected === option ? 'active' : ''}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown

Dropdown.propTypes = {
  'selected': string,
  'setSelected': func,
  'handleChange': func,
}
