/**
 * TaskForm Component
 * 
 * Reusable form component that handles adding new tasks, viewing existing tasks and editing existing tasks.
 * The form adapts its UI and behavior based on the 'mode' prop.
 * 
 * @param {string} mode - Either 'add', 'edit', or 'view' to determine form behavior
 * @param {object|null} task - The task object being edited/viewed (null when adding)
 * @param {object} formData - Current form input values { name, description, category, priority }
 * @param {array} categories - List of available category strings
 * @param {function} onInputChange - Handler for input changes, receives event object
 * @param {function} onSubmit - Handler for form submission (addTask or saveTask)
 * @param {function} onDelete - Handler for delete button (only shown in edit mode)
 * @param {function} onClose - Handler for closing the form modal
 */
function TaskForm({
  mode, 
  task = null,              
  formData = {},            
  categories = [],         
  onInputChange = () => {}, 
  onSubmit = () => {},      
  onDelete = null,
  onClose,
  onAddCategory = () => {}  
}) {

  // Determine what mode we're in for conditional rendering
  const isEditMode = mode === 'edit';
  const isViewMode = mode === 'view';
  const isAddMode = mode === 'add';

  return (
    
    // Overlay that darkens the background and centers the form
    <div className="formOverlay">
      
      {/* Form Container */}
      <div className="taskForm">
        
        {/* Dynamic header based on mode */}
        <h2>
          {isAddMode && 'Add Task'}
          {isEditMode && 'Edit Task'}
          {isViewMode && 'View Task'}
        </h2>

        {/* Subtitle showing which task is being edited/viewed */}
        {isEditMode && <p>Editing: {task.name}</p>}
        {isViewMode && <p>Viewing: {task.name}</p>}

        {/* Conditional rendering: view mode shows read-only data, add/edit shows inputs */}
        {isViewMode ? (
          // Read-only display for view mode
          <>
            <p><strong>Name:</strong> {task.name}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Category:</strong> {task.category || 'None'}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
          </>
        ) : (
          // Editable form inputs for add/edit modes
          <>
            {/* Name input field */}
            <label htmlFor="name">Name</label>
            <input 
              type="text"
              id="name"
              name="name"  // Must match formData property
              value={formData.name}
              onChange={onInputChange}
            />

            {/* Description input field */}
            <label htmlFor="description">Description</label>
            <input 
              type="text"
              id="description"
              name="description"  // Must match formData property
              value={formData.description}
              onChange={onInputChange}
            />

            {/* Category dropdown selector */}
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"  // Must match formData property
              value={formData.category}
              onChange={onInputChange}
            >
              {/* Default empty option */}
              <option value="">--None--</option>
              
              {/* Map through categories array to create options */}
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Priority dropdown selector */}
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"  // Must match formData property
              value={formData.priority}
              onChange={onInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </>
        )}

        {/* Action buttons - displayed conditionally based on mode */}
        <div className="formButtons">
          
          {/* Close button - always shown in all modes */}
          <button onClick={onClose}>Close</button>

          {/* Delete button - only shown when editing (not in add or view mode) */}
          {isEditMode && !isViewMode && (
            <button onClick={() => onDelete(task.id)}>Delete</button>
          )}

          {/* Submit button - only shown in add/edit modes, hidden in view mode */}
          {(isEditMode || isAddMode) && (
            <button onClick={onSubmit}>
              {isEditMode ? 'Save' : 'Add'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskForm;