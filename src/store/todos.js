import { createSlice } from '@reduxjs/toolkit'
import { getItem, setItem, hasItem } from '../helpers/storage'

const todos = createSlice({
  'name': 'todos',
  'initialState': {
    'todos': getItem('todos') || [],
    'filterTodos': getItem('todos') || [],
  },
  'reducers': {
    addItem(state, action) {
      const todo = {
        'id': new Date().toISOString(),
        'text': action.payload.todoTxt,
        'completed': false,
      }
      state.todos.push(todo)

      if (getItem('filterBy') === 'all' || getItem('filterBy') === 'current') {
        state.filterTodos.push(todo)
      }

      setItem('todos', hasItem('todos') ? [...getItem('todos'), todo] : [todo])
    },

    removeItem(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)

      state.filterTodos = state.filterTodos.filter((todo) => {
        return todo.id !== action.payload.id
      })

      setItem('todos', getItem('todos').filter((todo) => {
        return todo.id !== action.payload.id
      }))
    },

    updateItem(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)

      state.filterTodos = state.filterTodos.filter((todo) => {
        return todo.id !== action.payload.id
      })

      setItem('todos', getItem('todos').filter((todo) => {
        return todo.id !== action.payload.id
      }))

      const todo = {
        'id': new Date().toISOString(),
        'text': action.payload.txt,
        'completed': false,
      }
      state.todos.push(todo)
      state.filterTodos.push(todo)
      setItem('todos', hasItem('todos') ? [...getItem('todos'), todo] : [todo])
    },

    updateTodos(state, action) {
      state.filterTodos = action.payload.filterItems
    },

    completedTodo(state, action) {
      for (const todo of state.todos) {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed
        }
      }

      for (const todo of state.filterTodos) {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed
        }
      }

      if (getItem('filterBy') !== 'all') {
        state.filterTodos = state.filterTodos.filter((todo) => {
          return todo.id !== action.payload.id
        })
      }

      setItem('todos', state.filterTodos)
    },
  },
})

export const {
  addItem,
  removeItem,
  updateItem,
  completedTodo,
  updateTodos,
} = todos.actions

export default todos.reducer
