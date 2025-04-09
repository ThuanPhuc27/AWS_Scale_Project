const API_URL = config.API_URL

const createTaskHtml = (
  id,
  name,
  description,
  assignedTo,
  dueDate,
  status,
  priority,
) => {
  const html = `
  <li class="list-group-item list-border" data-task-id="${id}">
    <div class="card cardstyle">
      <div class="card-body">
        <h3 class="card-title">${name}</h3>
        <p class="card-text">${description}</p>
        <h6 class="card-subtitle mb-2 mt-2">Assigned To: <span class="h5 strong">${assignedTo}</span></h6>
        <h6 class="card-subtitle mb-2">Priority: <span class="strong">${priority}</span></h6>
        <h6 class="card-subtitle my-3">Date: <span class="strong">${dueDate}</span></h6>
        <div class="align-items-baseline justify-content-between">
          <h6 class="card-subtitle my-3 mt-4">Status: <span class="strong">${status}</span></h6>
          <div class="container">
            <div class="row row-cols-1 row-cols-md-4 justify-content-center">
              <button class="col-4 btn btn-outline-success edit-button mx-5">
                <i class="fa fa-pencil"></i> Edit
              </button>
              <button class="col-4 btn btn-outline-danger mx-5 delete-button">
                <i class="fa fa-trash"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>`

  return html
}

class TaskManager {
  constructor() {
    this.tasks = []
  }

  // Fetch tasks from the backend
  async loadTasks() {
    try {
      const response = await fetch(`${API_URL}/tasks/all`)
      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }
      // Assuming the response is an array of task objects
      this.tasks = await response.json()
      this.render()
    } catch (error) {
      console.error('Error loading tasks:', error)
    }
  }

  // Create a new task on the backend
  async addTask(name, description, assignedTo, dueDate, status, priority) {
    const newTask = {
      name,
      description,
      assignedTo,
      dueDate,
      status,
      priority,
    }
    console.log('newTask', newTask)
    try {
      const response = await fetch(`${API_URL}/tasks/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      })
      if (!response.ok) {
        throw new Error('Failed to add task')
      }
      const result = await response.json()
      // Assuming your API sends the created task under a "data" key
      this.tasks.push(result.data)
      this.render()
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  // Update an existing task on the backend
  async updateTask(taskId, updatedData) {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
      if (!response.ok) {
        throw new Error('Failed to update task')
      }
      const result = await response.json()
      // Update the task locally
      const index = this.tasks.findIndex((task) => task.id === taskId)
      if (index !== -1) {
        this.tasks[index] = result.data
      }
      this.render()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  // Delete a task from the backend
  async deleteTask(taskId) {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}/delete`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete task')
      }
      // Remove the task locally
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      this.render()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Render the tasks on the page
  render() {
    const filterContainer = document.getElementById('taskFilter')

    if (this.tasks.length === 0) {
      filterContainer.style.display = 'none'
      document.querySelector('#taskList').innerHTML = `
        <li class="list-group-item text-center">No tasks currently</li>
      `
      return
    } else {
      filterContainer.style.display = 'flex'
    }

    // If no filters are active, render all tasks
    this.renderTasks(this.tasks)
  }

  // A helper method to render an array of tasks
  renderTasks(tasksArray) {
    const tasksHtmlList = tasksArray.map((task) => {
      const date = new Date(task.dueDate)
      const formattedDate =
        ('0' + date.getDate()).slice(-2) +
        '/' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '/' +
        date.getFullYear()
      return createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status,
        task.priority,
      )
    })
    const taskHtml = tasksHtmlList.join('\n')
    document.querySelector('#taskList').innerHTML = taskHtml
  }

  // New method: filter tasks by due date and priority
  filterTasks() {
    let filteredTasks = [...this.tasks] // copy full tasks list

    // Get filter values
    const dueDateFilter = document.getElementById('filterDueDate').value
    const priorityFilter = document.getElementById('filterPriority').value

    // Filter by priority if a value is selected
    if (priorityFilter !== '') {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priorityFilter,
      )
    }

    // Sort by due date if selected
    if (dueDateFilter === 'asc') {
      filteredTasks = filteredTasks.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      )
    } else if (dueDateFilter === 'desc') {
      filteredTasks = filteredTasks.sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate),
      )
    }

    // If no tasks match the filter criteria, show a message
    if (filteredTasks.length === 0) {
      document.querySelector('#taskList').innerHTML = `
        <li class="list-group-item text-center">No tasks match the filter criteria</li>
      `
    } else {
      this.renderTasks(filteredTasks)
    }
  }
}
