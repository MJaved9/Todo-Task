import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState,useEffect } from "react";
import axios from "axios"

const Todo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  

  const getData = () => {
    fetch("http://localhost:8080/todo", {
        method : "GET",
        headers
    })
    .then((res) => res.json())
    .then((res)=>console.log(res))
    .then((res) => setTodos(res))
    .catch((err) => console.log(err))
}

const handleAddTodo=()=>{
  axios.post("http://localhost:8080/todo/create", newTodo, { headers })
  .then(response => {
    // Handle the response
    console.log(response);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });


}
const handleDeleteTodo=()=>{

}
const handleToggleTodo=()=>{
  
}


useEffect(() => {
    getData()
},[])

  if (token === null || token === "Email or password Wrong..") {
    return (
      <>
        <h1>
          Please Login cleck here...
          <Link
            to="/login"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Login
          </Link>
        </h1>
      </>
    );
  } else {
    return (
      <Box padding="5% 15% 5% 5%">
        <Heading>Todo App...</Heading>
        <br/>
        <center>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" p="4" >
          <FormControl mb="4">
            <FormLabel>Add New Todo</FormLabel>
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter a todo item"
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleAddTodo}>
            Add Todo
          </Button>
          {/* <Stack mt="4" spacing="2">
            {todos.map((ele,index)=>{
              return <Box key={index} borderWidth="1px" borderRadius="md" p="2">
              <Checkbox
                isChecked={ele.completed}
                onChange={() => handleToggleTodo(index)}
              >
                <Text
                  textDecoration={ele.completed ? "line-through" : "none"}
                >
                  {ele.Todo}
                </Text>
              </Checkbox>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete
              </Button>
            </Box>
            })}
          </Stack> */}
        </Box>
        </center>
      </Box>
    );
  }
};

export default Todo;
