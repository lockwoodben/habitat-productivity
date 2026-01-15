import './App.css'
import TaskCard from './todo/components/TaskCard';
import TaskForm from './todo/components/TaskForm';
import {useTasks} from './todo/hooks/UseTasks';



function App() {

  // Import all state and operations from custom hook
  const{
    //States
        tasks,
        categories,
        formData,
        activeTasks,
        completedTasks,
        taskBeingEdited,
        taskBeingViewed,
        showAddTaskModal,
        showViewTaskModal,
        showEditTaskModal,

        // Task operations
        addTask,
        saveTask,
        toggleTask,
        deleteTask,

        // Category operations
        addCategory,

        // Form operations
        handleInputChange,

        // Modal controls
        openAddTask,
        openEditTask,
        openViewTask,
        closeAddTask,
        closeEditTask,
        closeViewTask
  } = useTasks();

  return (

<div className="App">
      <h1>Habitat</h1>

      {/* Modals */}
      {showAddTaskModal && (
        <TaskForm 
          mode="add"
          formData={formData}
          categories={categories}
          onInputChange={handleInputChange}
          onSubmit={addTask}
          onClose={closeAddTask}
          onAddCategory={addCategory}
        />
      )}

      {showEditTaskModal && (
        <TaskForm 
          mode="edit"
          task={taskBeingEdited}
          formData={formData}
          categories={categories}
          onInputChange={handleInputChange}
          onSubmit={saveTask}
          onDelete={deleteTask}
          onClose={closeEditTask}
          onAddCategory={addCategory}
        />
      )}

      {showViewTaskModal && (
        <TaskForm 
          mode="view"
          task={taskBeingViewed}
          onClose={closeViewTask}
        />
      )}

      {/* Main Content */}
      <button onClick={openAddTask}>Add Task</button>

      <h2>To Do</h2>
      <div className="taskList">
        {activeTasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onEdit={openEditTask}
            onView={openViewTask}
          />
        ))}
      </div>

      <h2>Completed</h2>
      <div className="completedTasks">
        {completedTasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onEdit={openEditTask}
            onView={openViewTask}
            showDescription={false}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
