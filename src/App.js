import { useState,useEffect } from "react";
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import Footer from "./Components/Footer";
import About from "./Components/About";

function App() {
  const [toggleAdd,setToggleAdd] = useState(false);
  const [tasks,setTasks] = useState([])

useEffect(() => {
    const getTasks = async ()=> {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks();
}, [])

const fetchTasks = async () => {
  const res = await fetch(`http://localhost:5050/tasks`)
  const data = await res.json();
  return data;
}

const fetchTask = async (id)=>{
  const res = await fetch(`http://localhost:5050/tasks/${id}`)
  const data = await res.json();
  return data;
}

  const addTask = async (task)=>{
    // const id = Math.floor(Math.random()*10000) + 1;
    // const newTask = {id,...task}
    // setTasks([...tasks,newTask])

    const res = await fetch(`http://localhost:5050/tasks`,
    {
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(task)
    })
    const data = await res.json();
    setTasks([...tasks,data])

  }

  const deleteTask = async (id)=>{
    await fetch(`http://localhost:5050/tasks/${id}`,{
      method:'DELETE',
    })
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  const toggleReminder = async (id)=>{
    const taskToToggle = await fetchTask(id);
    const updatedTask =  {...taskToToggle,
    reminder:!taskToToggle.reminder}
    
    const res = await fetch(`http://localhost:5050/tasks/${id}`,
    {
      method:'PUT',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task)=>{
      return task.id===id?{...task,reminder:data.reminder}:task
    }))
  }

  return (
    <Router>
      <div className="container">
        <Header onToggle={()=>setToggleAdd(!toggleAdd)}
                toggleAdd = {toggleAdd}        
        />
        <Routes>
        <Route path="/"
        element={
          <>
            {toggleAdd && <AddTask onAdd={addTask}/>}
              {tasks.length>0
              ?
              <Tasks tasks={tasks} 
                     onDelete = {deleteTask}
                    onToggle = {toggleReminder}
              />
              :
              ('No Tasks Here!')}
          </>
        }
          />
        <Route path="/about" element={<About/>}/> 
        </Routes>
        <Footer/>
      </div>
      </Router>
  );
}

export default App;
