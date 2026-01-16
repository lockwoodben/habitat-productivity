import './App.css'
import {useEffect, useState} from 'react';
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

 // Detect system theme preference (dark/light mode)
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Listen for system theme changes and update accordingly
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


   return (
    // Apply theme class based on system preference
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      
      {/* Page Header */}
      <h1>Habitat</h1>

      {/* Add Task Modal */}
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

      {/* Edit Task Modal */}
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

      {/* View Task Modal */}
      {showViewTaskModal && (
        <TaskForm 
          mode="view"
          task={taskBeingViewed}
          onClose={closeViewTask}
        />
      )}

      {/* Add Task Button */}
      <button onClick={openAddTask}>Add Task</button>

      {/* Active Tasks Section */}
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

      {/* Completed Tasks Section */}
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
