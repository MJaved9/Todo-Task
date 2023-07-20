import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TASK = () => {
  let token = localStorage.getItem('token');

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/todo', {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your actual authorization token
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    console.log(newTodo);
    try {
      const response = await axios.post(
        'http://localhost:8080/todo/create',
        {
          title: newTodo,
          completed: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Replace with your actual authorization token
          },
        }
      );

      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8080/todo/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your actual authorization token
        },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    try {
      await axios.patch(
        `http://localhost:8080/todo/edit/${id}`,
        { completed: updatedTodos.find((todo) => todo.id === id).completed },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Replace with your actual authorization token
          },
        }
      );

      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Filter todos based on completed status
  const filteredTodos = todos.filter((todo) => showCompleted || !todo.completed);

  // Filter todos based on search term
  const searchedTodos = filteredTodos.filter((todo) =>
    todo.Todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Todo List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo..."
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleAddTodo}
          style={{ padding: '8px 15px', borderRadius: '4px', background: 'green', color: 'white', border: 'none' }}
        >
          Add
        </button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />
          Show Completed
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Todo..."
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <ul>
        {searchedTodos.map((todo, i) => (
          <li key={i} style={{ marginBottom: '10px' }}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                marginRight: '10px',
              }}
            >
              {todo.Todo}
            </span>
            <button
              onClick={() => handleToggleTodo(todo.id)}
              style={{
                padding: '5px 10px',
                borderRadius: '4px',
                background: todo.completed ? 'gray' : 'blue',
                color: 'white',
                border: 'none',
                marginRight: '10px',
              }}
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              style={{
                padding: '5px 10px',
                borderRadius: '4px',
                background: 'red',
                color: 'white',
                border: 'none',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TASK;
