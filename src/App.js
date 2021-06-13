import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
   const [showAddTask, setShowAddTask] = useState(false)
   const [tasks, setTasks] = useState([])

  //  useEffect(() => {
  //    const getTasks = async () => {
  //      const taskFromServer = await fetchTask();
  //      setTasks(taskFromServer)

  //    }
  //    getTasks()
  //  }, []);

  
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setTasks(data)
      })

  },[]);
  

//delete task
const deleteTask = async (id) =>{
  await fetch(`http://localhost:5000/tasks/${id}`,
  {method : 'DELETE'})
  setTasks(tasks.filter((task)=>task.id !== id))
}

//fetchbtask

const fetchTask = async (id) => {
  
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        return data
      })
      return res  
}

//toggle reminder
const toggleReminder = async (id) =>{
  const tasktotoggle = await fetchTask(id)
  console.log(tasktotoggle)
  const updTask = {...tasktotoggle,reminder :!tasktotoggle.reminder}
  console.log(updTask)
  const res = await fetch(`http://localhost:5000/tasks/${id}`,
     {
        method : 'PUT',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(updTask)
      }
    )
    
    const data = await res.json()
    console.log(data)
  setTasks(
    tasks.map((task)=>
      task.id === id ? {...task,reminder: data.reminder} : task
    )
  )  
}


//add task
const addTask = async (task) => {
  // const id= Math.floor(Math.random() * 100 + 1)
  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])
  const res = await fetch('http://localhost:5000/tasks',
      {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(task)
      }
    )
    const data = await res.json()
    setTasks([...tasks,data])
}
const onAdd = () => {
  setShowAddTask(!showAddTask)
}
  return (
    <Router>
    <div className="container">
      <Header onAdd = {onAdd} showAdd={showAddTask}/>
      
      <Route exact path="/" render = {(props)=>
      (
        <>
          {showAddTask && <AddTask onadd={addTask} />}
          {tasks.length > 0 ? 
          (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) 
          : 
          ("No Task Remaining")}
        </>
      )
    }/>
      <Route path="/About" component={About}/>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
