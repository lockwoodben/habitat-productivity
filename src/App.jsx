import { useState, useEffect } from 'react';
import './App.css'


function App() {

  // initialize tasks array by attempting to load from localStorage
  // if found, parse and return them. If not, return empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('habitatTasks');

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [];
  });

  //const used to track what task is being edited
  const [editingTaskId, setEditingTaskId]  = useState(null);

  //const used to track what task is being viewed
  const [viewingTaskId, setViewingTaskId] = useState(null);

  // useEffect hook that saves tasks to localStorage whenever the tasks array changes
  useEffect(() => { localStorage.setItem('habitatTasks', JSON.stringify(tasks)); }, [tasks]);


  // Two constants defined by filtering the tasks array in completed and uncompleted parts
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // find the task being edited
  const taskBeingEdited = editingTaskId ? tasks.find(task => task.id === editingTaskId) : null;

  // initialize addTaskOverlay to hidden
  const [showAddTaskOverlay, setAddTaskOverlay] = useState(false);

  // find the task being viewed
  const taskBeingViewed = viewingTaskId ? tasks.find(task => task.id === viewingTaskId) : null;


  // state used to manage form data while editing tasks
  // holds current values of the edit form inputs
  const [formData, setFormData] = useState({ name: '', description: '' });

  // function used to create a new task by pulling values from form data then closing overlay
  function addTask() {

    const newTask = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      category: "",
      completed: false
    };

    setTasks([...tasks, newTask]);
    setFormData({ name: '', description: ''})
    setAddTaskOverlay(false)
  }


  // function to handle the toggling of the checkbox.
  // iterates through tasks and if the id matches, it flips the boolean, else returns unchanged value
  // then updates the tasks array
  function toggleTask(taskId) {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task
    );

    setTasks(updatedTasks)
  }

  // function to edit a task
  function editTask(taskId) {

    // declare what task we're editing
    setEditingTaskId(taskId);

  }

  // function to view a task
  function viewTask(taskId) {
    
    setViewingTaskId(taskId)
  }

  useEffect(() => {
    if (taskBeingEdited) {
      setFormData ({
        name: taskBeingEdited.name,
        description: taskBeingEdited.description || ''
      });
    }
  }, [taskBeingEdited]);

  // event handler for form input changes
  const handleInputChange = (e) => {
  const { name, value } = e.target
    
    setFormData({...formData, [name]: value});
  }

  // function to saved edited tasks back to tasks array
  const saveTasks = () => {
    const updatedTasks = tasks.map(task =>
      task.id === taskBeingEdited.id ? {...task, ...formData} : task
    );

    setTasks(updatedTasks)
    setEditingTaskId(null);
  }


  // function to delete task
  // iterates through task list filters desired task and closes the editing modal
  function deleteTask(taskId) {

    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setEditingTaskId(null);

  }


  return (

    // what is displayed
    <div className="App">

    {/* Page title */}
      <h1> Habitat</h1>

      {/* Add Task Form*/}
      { showAddTaskOverlay && (
      <div className="addFormOverlay">
        <div className="addForm">
          <h2>Add Task</h2>
          
          {/* user input forms */}
          <label htmlFor="name">Name</label>
          <input type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}/>

          <label htmlFor="description">Description</label>
          <input type="text"
            id="description"
            name="description"
            value={formData.name}
            onChange={handleInputChange}/>

          <button onClick={() => {setAddTaskOverlay(false); setFormData({ name: '', description: '' });}}>Close</button>
          <button onClick={addTask}>Add</button>
        </div>
      </div>
      )}

      {/* Edit form */}
      {taskBeingEdited && (
      <div className="editFormOverlay">
        <div className="editForm">
          <h2>Edit Task</h2>
          <p>Editing: {taskBeingEdited.name}</p>

          {/* user input forms */}
          <label htmlFor="name">Name</label>
          <input type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}/>

          <label htmlFor="description">Description</label>
          <input type="text"
            id="description"
            name="description"
            value={formData.name}
            onChange={handleInputChange}/>

          <button onClick={() => { setEditingTaskId(null); setFormData({ name: '', description: '' })}}>Close</button>
          <button onClick={() => deleteTask(taskBeingEdited.id)}>Delete</button>
          <button onClick={saveTasks}>Save</button>
        </div>
      </div>
    )}

    {/* Edit form */}
      {taskBeingViewed && (
      <div className="viewFormOverlay">
        <div className="viewForm">
          <h2>View Task</h2>
          <p>Viewing: {taskBeingViewed.name}</p>

          <h3>{taskBeingViewed.description}</h3>

          <button onClick={() => setViewingTaskId(null)}>Close</button>
        </div>
      </div>
    )}

      {/*Add task button*/}
      <button onClick={() => setAddTaskOverlay(true)}>Add Task</button>

      <h2>To Do</h2>

      {/* Print active tasks */}
       {/* Generate task card with name, description, category, checkbox, and edit button*/}
        {activeTasks.map(task => (
            <div key={task.id} className="taskCard">
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              <span>{task.category}</span>
              <input type="checkbox"
                checked = {task.completed}
                onChange={() => toggleTask(task.id)}></input>
                <button className="editButton" onClick={() => editTask(task.id)}>Edit</button>
                <button className="viewButton" onClick={() => viewTask(task.id)}>View</button>
            </div>
        ))}

      <h2>Completed</h2>

      {/* Print completed tasks */}
      {/* Generate task card with name, description, category, and checkbox*/}
      <div className="completedTasks">
        {completedTasks.map(task => (
              <div key={task.id} className="taskCard">
                <h3>{task.name}</h3>
                <span>{task.category}</span>
                <input type="checkbox"
                  checked = {task.completed}
                  onChange={() => toggleTask(task.id)}></input>
                  <button className="editButton" onClick={() => editTask(task.id)}>Edit</button>
                  <button className="viewButton" onClick={() => viewTask(task.id)}>View</button>
            </div>
        ))}
        </div>
        </div>
  );
}
export default App;
