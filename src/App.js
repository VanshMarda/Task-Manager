import Header from './components/Header'
import Tasks from './components/Tasks';
import {useState,useEffect} from 'react'
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  let val ;
  const [showAddTask , setShowAddTask] = useState(false);
  const [tasks , setTasks] = useState([])

  useEffect(() => {
    async function getTask(){
      const taskFromServer = await fetchTask();
      setTasks(taskFromServer);
    }
    getTask();
  }, []);

  async function fetchTask(){
    const res = await fetch('http://localhost:5000/tasks');  
    const data = await res.json();
    return data;
  }                       

  async function fetchTas(id){  
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();                    
    return data;
  }                                 


async function toogleReminder(id){
  const tasktotoggle =await fetchTas(id);
  const uptask = {...tasktotoggle,reminder:!tasktotoggle.reminder}
  const res=await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(uptask)
  })
  const data = await  res.json();    

  
  val =id;
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    )
  )
}

async function deleteTask(id) {
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
  })
  val =id;
  setTasks(tasks.filter((task) => task.id !==id));
}

async function addTask(task){

  const res =await fetch('http://localhost:5000/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(task)
  })

  const data = await  res.json();    
  setTasks([...tasks , data]);
  // const id = Math.floor(Math.random()*1000)+1;
  // const newTask = {id ,...task} 
  // setTasks([...tasks, newTask]);
}



return (
    <Router>
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)}showAdd={showAddTask} />
      <Routes>
        <Route
          path='/'
          element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (<Tasks tasks={tasks}  onDelete={deleteTask}  onToogle={toogleReminder} />) : ('No Tasks To Show')}
            </>
          }
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default App;
