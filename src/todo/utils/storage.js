/**
 * Storage Utilities
 * 
 * Centralized functions for interacting with browser localStorage.
 * Handles JSON serialization/deserialization and error handling.
 */

/**
 * Load data from localStorage
 * @param {string} key - The localStorage key to read from
 * @param {*} defaultValue - Value to return if key doesn't exist
 * @returns {*} Parsed data or defaultValue
 */
export function loadFromStorage(key, defaultValue) {
    try {
        const savedData = localStorage.getItem(key);
        return savedData ? JSON.parse(savedData) : defaultValue;
    } catch (error) {
        console.error(`Error loading ${key} from storage:`, error)
        return defaultValue;
    }
}

/**
 * Save data to localStorage
 * @param {string} key - The localStorage key to write to
 * @param {*} data - Data to save (will be JSON stringified)
 */
export function saveToStorage(key, data) {
    try {
       localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to storage`, error);
    }
}

/**
 * Remove data from localStorage
 * @param {string} key - The localStorage key to remove
 */
export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing ${key} from storage`, error);
    }
}

