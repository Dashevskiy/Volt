import React, { useState } from 'react'
import './index.css'
import { useDispatch } from 'react-redux'
import { addItem } from '../../store/todos'

const MIN_LENTH = 'min lenth 3 symbol'
const MAX_LENTH = 'max lenth 20 symbol'
const ERROR_MESSAGE = 'error-message'

export const NewTodoField = () => {
  const [todoTxt, setTodoTxt] = useState('')
  const [isHidden, setStateHidden] = useState('hidden')
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  const onChangeTodoTxt = (value) => {
    setTodoTxt(value)

    if (value.length < 3) {
      setStateHidden(ERROR_MESSAGE)
      setErrorMessage(MIN_LENTH)
    } else if (value.length > 20) {
      setStateHidden(ERROR_MESSAGE)
      setErrorMessage(MAX_LENTH)
    } else {
      setStateHidden('hidden')
    }
  }

  const addTodo = () => {
    if (todoTxt.length < 3) {
      setStateHidden(ERROR_MESSAGE)
      setErrorMessage(MIN_LENTH)
    } else if (todoTxt.length > 20) {
      setStateHidden(ERROR_MESSAGE)
      setErrorMessage(MAX_LENTH)
    } else {
      dispatch(addItem({ todoTxt }))
      setStateHidden('hidden')
      setTodoTxt('')
    }
  }

  return (
        <>
            <label className='newTodoContainer'>
                <input
                    className="newTodoInput"
                    placeholder='new todo'
                    onChange={(event) => onChangeTodoTxt(event.target.value)}
                    value={todoTxt}
                />
                <button className='btn-add' onClick={addTodo}>Add todo</button>
            </label>
            <div className={isHidden}>{errorMessage}</div>
        </>
  )
}
