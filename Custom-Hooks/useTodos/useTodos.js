import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';


const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || [];
}

// En el useReducer, se podría poner [] y quitar initialState
// Poner solo [], es lo mismo
const initialState = [];

export const useTodos = () => {
  
    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

    // Para guardar en el LocalStorage del navegador
    useEffect(() => {
      localStorage.setItem( 'todos', JSON.stringify( todos ) )

    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        const action ={
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    return{
        todos,
        
        todosCount: todos.length, 
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}
