import React, { useState } from 'react'
import { string } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updateItem, removeItem, completedTodo } from '../../store/todos'
import './index.css'

const MIN_LENTH = 'min lenth 3 symbol'
const MAX_LENTH = 'max lenth 20 symbol'
const ERROR_MESSAGE = 'error-message'

export const TodoItem = ({ id, text }) => {
  const [value, setValue] = useState()
  const [icon, setIcon] = useState(true)
  const [isHidden, setStateHidden] = useState('hidden')
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos.todos)

  const todo = todos.find((el) => el.id === id)

  // eslint-disable-next-line complexity
  const updateTodo = () => {
    if (typeof value === 'string' && String(value).length < 3) {
      setStateHidden(ERROR_MESSAGE)
      setErrorMessage(MIN_LENTH)
    } else if (typeof value === 'string' && String(value).length > 20) {
      setStateHidden(ERROR_MESSAGE)
      setErrorMessage(MAX_LENTH)
    } else {
      setIcon((prev) => !prev)
      setStateHidden('hidden')
      const txt = value === undefined ? text : value
      if (icon === false) {
        dispatch(updateItem({ id, txt }))
      }
    }
  }

  return (
        <>
        <li className="todo-item">
            <input
              onChange={(event) => setValue(event.target.value)}
              onClick={() => dispatch(completedTodo({ id }))}
              value={value === undefined ? text : value}
              className={`txt ${todo.completed && icon ? 'done' : ''}`}
              readOnly={icon}/>

            <div className='icon-container'>
              <div
                className={`btn-icon icon-${icon ? 'edit' : 'success'}`}
                onClick={updateTodo}>
              </div>

              <div className="btn-icon icon-delete" onClick={() => {
                dispatch(removeItem({ id }))
              }}></div>
            </div>
        </li>
        <div className={isHidden}>{errorMessage}</div>
        </>
  )
}

TodoItem.propTypes = {
  'id': string,
  'text': string,
}
