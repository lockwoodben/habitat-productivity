/**
 * TaskCard Component
 * 
 * Displays a single task with its information and action buttons.
 * 
 * @param {object} task - The task object containing id, name, description, category, completed, priority
 * @param {function} onToggle - Handler called when checkbox is toggled, receives task id
 * @param {function} onEdit - Handler called when edit button is clicked, receives task id
 * @param {function} onView - Handler called when view button is clicked, receives task id
 * @param {boolean} showDescription - Whether to display the task description (default: true)
 */
function TaskCard({ task, onToggle, onEdit, onView, showDescription = true }) {
  return (
    <div className="taskCard">
      {/* Task name as heading */}
      <h3>{task.name}</h3>
      
      {/* Description - conditionally shown based on prop */}
      {showDescription && <p>{task.description}</p>}
      
      {/* Category label */}
      <span>{task.category}</span>
      
      {/* Completion checkbox */}
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      
      {/* Edit button - opens edit modal */}
      <button className="editButton" onClick={() => onEdit(task.id)}>
        Edit
      </button>
      
      {/* View button - opens view modal */}
      <button className="viewButton" onClick={() => onView(task.id)}>
        View
      </button>
    </div>
  );
}

export default TaskCard;