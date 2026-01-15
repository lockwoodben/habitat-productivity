import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage, removeFromStorage} from '../utils/storage';


/**
 * Custom Hook: useTasks
 * 
 * Manages all task-related state and operations including:
 * - Task CRUD operations (Create, Read, Update, Delete)
 * - Category management
 * - Form state management
 * - localStorage persistence
 * 
 * @returns {object} All task state and handler functions
 */
export function useTasks() {


    // ++ STATES ++

    // Initialize main tasks array from local storage
    // Each task has an id, name, description, category, priority, and completed state
    const [tasks, setTasks] = useState(() => loadFromStorage('habitatTasks', []));

    // Initialize categories array from local storage
    const [categories, setCategories] = useState(() => loadFromStorage('habitatCategories', []));

    // Inialize form data for add/edit operations
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        priority: 'low'
    });

    // UI State
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showViewTaskModal, setShowViewTaskModal] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const[viewingTaskId, setViewingTaskId] = useState(null);
    



    // ++ EFFECTS ++

    // Persist tasks and categories to local storage whenever they change
    useEffect(() => {saveToStorage('habitatTasks', tasks);}, [tasks]);
    useEffect(() => {saveToStorage('habitatCategories', categories);}, [categories]);

    // When editing a task, prefill the form with its data
    useEffect(() => {
        if (editingTaskId) {
            const task = tasks.find(t => t.id === editingTaskId);
            if (task) {
                setFormData ({
                    name: task.name,
                    description: task.description || '',
                    category: task.category || '',
                    priority: task.priority || 'low'
                });
            }
        }
    }, [editingTaskId, tasks]);


    // ++ VALUES ++

    // Sort tasks into active and completed arrays
    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks =  tasks.filter(task=> task.completed);

    // Get the task currently being edited/viewed. Return null if no task is being interacted with
    const taskBeingEdited = editingTaskId ? tasks.find(task => task.id === editingTaskId) : null;
    const taskBeingViewed = viewingTaskId ? tasks.find(task => task.id === viewingTaskId) : null;


    // ++ TASK OPERATIONS ++

    /**
    * Handle the process of adding a new task to the tasks array
    */
    function addTask() {

        // Make sure task has a name
        if (!formData.name.trim()) {
            alert('Task name is required');
            return;
        }

        // Creat new task with unique ID
        const newTask = {
            id: Date.now(),
            name: formData.name.trim(),
            description: formData.description.trim(),
            category: formData.category,
            priority: formData.priority,
            completed: false
        };

        // Add the task to the tasks array
        setTasks([...tasks, newTask]);

        // Reset form and close Modal
        resetForm();
        setShowAddTaskModal(false);
    }

    /**
    * Save a task to the tasks array
    */
    function saveTask() {

        // Make sure task has a name
        if(!formData.name.trim()) {
            alert('Task name is required');
            return;
        }

        // Map through the tasks array and update the task being changed
        const updatedTasks = tasks.map(task => task.id === editingTaskId ? {...task, ...formData} : task);

        // Update the state and close edit modal
        setTasks(updatedTasks);
        setEditingTaskId(null);
        setShowEditTaskModal(false);
        resetForm();
    }

    /**
     *  Toggle task's completed status
     * @param {number} taskId - Id of task to toggle
     */
    function toggleTask(taskId) {

        // Iterates through tasks array and toggles desired task then updates array
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? {...task, completed: !task.completed} : task
        );
        setTasks(updatedTasks);
    }

    /**
    * Delete task from task's array
    * @param {number} taskId - Id of task to delete
    */
    function deleteTask(taskId) {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);

        setEditingTaskId(null);
        setViewingTaskId(null);
        setShowEditTaskModal(false);
        setShowViewTaskModal(false);
    }

    // ++ CATEGORY OPERATIONS

    /**
     * Add a new category to the caregories array
     * @param {string} categoryName - name of category to add
     * @returns {string|null} The added category name, or null if invalid
     */
    function addCategory(categoryName) {

        // Format the name
        const trimmed = categoryName.trim();

        // Make sure the name is not empty. If it is, return null
        if(!trimmed) {
            alert('Category name cannot be empty');
            return null;
        }

        // Make sure the name does not already exist in the array. If it does, return null
        if (categories.includes(trimmed)) {
            alert('Category already exists');
            return null;
        }

        // Add the category and return the category name
        setCategories([...categories, trimmed]);
        return trimmed;
    }

    // ++ Form Operations ++


    /**
     *  Handle input changes in forms
     * Updates formData with new value from input field
     * @param {Event} e - Input change event
     */
    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    /**
     * Reset form data to default values
     */
    function resetForm() {
        setFormData({
            name: '',
            description: '',
            category: '',
            priority: 'medium'
        });
     }

     /**
      * Open the edit modal for a specific task
      * @param {number} taskId 
      */
    function openEditTask(taskId) {
        setEditingTaskId(taskId);
        setShowEditTaskModal(true);
    }

    /**
     * Open the view modal for a specific task
     * @param {number} taskId 
     */
    function openViewTask(taskId) {
        setViewingTaskId(taskId);
        setShowViewTaskModal(true);
    }

    /**
     * Open the add task modal
     */
    function openAddTask() {
        setShowAddTaskModal(true);
    }

    /**
     * Close the edit task modal
     */
    function closeEditTask() {
        setShowEditTaskModal(false);
        setEditingTaskId(null);
        resetForm();
    }

    /**
     * close the view task modal
     */
    function closeViewTask() {
        setShowViewTaskModal(false);
        setViewingTaskId(null);
        resetForm();

    }

    /**
     * close the add task modal
     */
    function closeAddTask() {
        setShowAddTaskModal(false);
        resetForm()
    }

    // ++ RETURN API ++

    /**
     * Return all states and functions that components need
     */
    return {
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

    };
}