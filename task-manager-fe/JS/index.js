// Toggle the new task form and reset validations
const newTaskButton = document.querySelector('#newTask');
newTaskButton.addEventListener('click', newTaskToggler);

function newTaskToggler() {
  document.querySelector('#taskForm').reset();
  validationName.style.display = 'none';
  validationDescription.style.display = 'none';
  validationAssignedTo.style.display = 'none';
  validationDueDate.style.display = 'none';
  validationStatus.style.display = 'none';
  validationPriority.style.display = 'none';
  validationName.innerHTML = 'none';
  validationDescription.innerHTML = 'none';
  validationAssignedTo.innerHTML = 'none';
  validationDueDate.innerHTML = 'none';
  validationStatus.innerHTML = 'none';
  validationPriority.innerHTML = 'none';
}

function showAlert(message, type) {
  // Create a wrapper div for the alert
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="width: auto; margin-top: 20px;">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  // Append the alert to the alert container at the top of the screen
  const alertContainer = document.getElementById('alert-container');
  alertContainer.append(wrapper);

  // Automatically remove the alert after 3 seconds
  setTimeout(() => {
    wrapper.remove();
  }, 3000);
}

// Create TaskManager instance
const taskManager = new TaskManager(0);

// Display older tasks if there are any
taskManager.loadTasks();
taskManager.render();

// Select DOM elements
let taskName = document.querySelector('#taskName');
let description = document.querySelector('#description');
let assignedTo = document.querySelector('#assignedTo');
let dueDate = document.querySelector('#dueDate');
let status = document.querySelector('#status');
let priority = document.querySelector('#priority'); // NEW for priority
let submitTask = document.querySelector('#submitTask');

let validationName = document.querySelector('#validationName');
let validationDescription = document.querySelector('#validationDescription');
let validationAssignedTo = document.querySelector('#validationAssignedTo');
let validationDueDate = document.querySelector('#validationDueDate');
let validationStatus = document.querySelector('#validationStatus');
let validationPriority = document.querySelector('#validationPriority'); // NEW for priority

let taskForm = document.querySelector('#taskForm');
let taskList = document.querySelector('#taskList');

// Validation flags
let nameOk = false;
let descriptionOk = false;
let assignOk = false;
let dateOk = false;
let statusOk = false;
let priorityOk = false; // NEW flag

// Name input validation function
const nameValidFunc = () => {
  nameOk = false;
  if (taskName.value.length >= 5) {
    validationName.style.display = 'block';
    validationName.innerHTML = 'Looks good!';
    validationName.style.color = 'green';
    taskName.style.borderColor = 'green';
    nameOk = true;
  } else {
    validationName.style.display = 'block';
    validationName.innerHTML = 'Please provide a valid name (min 5 characters)';
    validationName.style.color = 'red';
    taskName.style.borderColor = 'red';
  }
};
taskName.addEventListener('input', nameValidFunc);

// Description input validation function
const descrValidFunc = () => {
  descriptionOk = false;
  if (description.value.length >= 5) {
    validationDescription.style.display = 'block';
    validationDescription.innerHTML = 'Looks good!';
    validationDescription.style.color = 'green';
    description.style.borderColor = 'green';
    descriptionOk = true;
  } else {
    validationDescription.style.display = 'block';
    validationDescription.innerHTML =
      'Please provide a valid description (min 5 characters)';
    validationDescription.style.color = 'red';
    description.style.borderColor = 'red';
  }
};
description.addEventListener('input', descrValidFunc);

// Assigned To validation function
const assignValidFunc = () => {
  assignOk = false;
  if (assignedTo.value.length >= 5) {
    validationAssignedTo.style.display = 'block';
    validationAssignedTo.innerHTML = 'Looks good!';
    validationAssignedTo.style.color = 'green';
    assignedTo.style.borderColor = 'green';
    assignOk = true;
  } else {
    validationAssignedTo.style.display = 'block';
    validationAssignedTo.innerHTML =
      'Please provide a valid name (min 5 characters)';
    validationAssignedTo.style.color = 'red';
    assignedTo.style.borderColor = 'red';
  }
};
assignedTo.addEventListener('input', assignValidFunc);

// Due Date validation function
const dateValidfunc = () => {
  dateOk = false;
  if (dueDate.value !== '') {
    let date = new Date(dueDate.value);
    date.setHours(0, 0, 0, 0);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (currentDate <= date) {
      validationDueDate.style.display = 'block';
      validationDueDate.innerHTML = 'Looks good!';
      validationDueDate.style.color = 'green';
      dueDate.style.borderColor = 'green';
      dateOk = true;
    } else {
      validationDueDate.style.display = 'block';
      validationDueDate.innerHTML = 'The date must be today or later!';
      validationDueDate.style.color = 'red';
      dueDate.style.borderColor = 'red';
    }
  } else {
    validationDueDate.style.display = 'block';
    validationDueDate.innerHTML = 'Please provide a valid date';
    validationDueDate.style.color = 'red';
    dueDate.style.borderColor = 'red';
  }
};
dueDate.addEventListener('input', dateValidfunc);

// Status validation function
const statusValidFunction = () => {
  statusOk = false;
  if (status.value !== 'select a status') {
    validationStatus.style.display = 'block';
    validationStatus.innerHTML = 'Looks good!';
    validationStatus.style.color = 'green';
    status.style.borderColor = 'green';
    statusOk = true;
  } else {
    validationStatus.style.display = 'block';
    validationStatus.innerHTML = 'Please select a valid status';
    validationStatus.style.color = 'red';
    status.style.borderColor = 'red';
  }
};
status.addEventListener('change', statusValidFunction);

// Priority validation function (NEW)
const priorityValidFunc = () => {
  priorityOk = false;
  // Assuming a valid option is always chosen since options are predefined (Low, Medium, High)
  if (priority.value !== '') {
    validationPriority.style.display = 'block';
    validationPriority.innerHTML = 'Looks good!';
    validationPriority.style.color = 'green';
    priority.style.borderColor = 'green';
    priorityOk = true;
  } else {
    validationPriority.style.display = 'block';
    validationPriority.innerHTML = 'Please select a priority';
    validationPriority.style.color = 'red';
    priority.style.borderColor = 'red';
  }
};
priority.addEventListener('change', priorityValidFunc);

// Form submission and overall validation
const validFormFieldInput = (event) => {
  event.preventDefault();

  // Run all validation functions
  nameValidFunc();
  descrValidFunc();
  assignValidFunc();
  dateValidfunc();
  statusValidFunction();
  priorityValidFunc();

  // Add task if all validations pass
  if (nameOk && descriptionOk && assignOk && dateOk && statusOk && priorityOk) {
    taskManager
      .addTask(
        taskName.value,
        description.value,
        assignedTo.value,
        dueDate.value,
        status.value,
        priority.value
      )
      .then(() => {
        // Show success alert after adding the task
        showAlert('Task added successfully!', 'success');

        // Reset input fields
        taskName.value = '';
        validationName.style.display = 'none';
        taskName.style.borderColor = '#ced4da';

        description.value = '';
        validationDescription.style.display = 'none';
        description.style.borderColor = '#ced4da';

        assignedTo.value = '';
        validationAssignedTo.style.display = 'none';
        assignedTo.style.borderColor = '#ced4da';

        dueDate.value = '';
        validationDueDate.style.display = 'none';
        dueDate.style.borderColor = '#ced4da';

        status.value = 'select a status';
        validationStatus.style.display = 'none';
        status.style.borderColor = '#ced4da';

        priority.value = 'Low'; // Reset to a default value
        validationPriority.style.display = 'none';
        priority.style.borderColor = '#ced4da';

        taskManager.render();
      });
  }
};

taskForm.addEventListener('submit', validFormFieldInput);

// Create a new Bootstrap Modal instance for the edit modal
let editTaskModal = new bootstrap.Modal(
  document.getElementById('editTaskModal')
);

// Event delegation for task list buttons (including edit)
taskList.addEventListener('click', (event) => {
  // Edit button event
  console.log('tessstttt');
  if (event.target.classList.contains('edit-button')) {
    const parentTask = event.target.closest('[data-task-id]');
    const taskId = parentTask.dataset.taskId;
    const task = taskManager.tasks.find((t) => t.id === Number(taskId));
    if (task) {
      // Populate modal fields with current task data
      document.getElementById('editTaskId').value = task.id;
      document.getElementById('editTaskName').value = task.name;
      document.getElementById('editDescription').value = task.description;
      document.getElementById('editAssignedTo').value = task.assignedTo;
      // Convert task.dueDate to yyyy-mm-dd format for the date input
      let date = new Date(task.dueDate);
      let yyyy = date.getFullYear();
      let mm = (date.getMonth() + 1).toString().padStart(2, '0');
      let dd = date.getDate().toString().padStart(2, '0');
      document.getElementById('editDueDate').value = `${yyyy}-${mm}-${dd}`;
      document.getElementById('editStatus').value = task.status;
      document.getElementById('editPriority').value = task.priority;

      // Show the edit modal
      editTaskModal.show();
    }
  }

  // Delete button event remains unchanged
  if (event.target.classList.contains('delete-button')) {
    const parentTask = event.target.closest('[data-task-id]');
    const taskId = parentTask.dataset.taskId;
    taskManager.deleteTask(taskId).then(() => {
      taskManager.loadTasks();
      taskManager.render();
      showAlert('Task deleted successfully!', 'success');
    });
  }
});

// Listen for the edit modal form submission
document
  .getElementById('editTaskForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('editTaskId').value;
    const updatedData = {
      name: document.getElementById('editTaskName').value,
      description: document.getElementById('editDescription').value,
      assignedTo: document.getElementById('editAssignedTo').value,
      dueDate: document.getElementById('editDueDate').value,
      status: document.getElementById('editStatus').value,
      priority: document.getElementById('editPriority').value,
    };

    // Update task on the backend and reload tasks
    await taskManager.updateTask(id, updatedData);
    await taskManager.loadTasks();
    editTaskModal.hide();
    showAlert('Task edited successfully!', 'success');
  });

// filter
document.getElementById('filterDueDate').addEventListener('change', () => {
  taskManager.filterTasks();
});

document.getElementById('filterPriority').addEventListener('change', () => {
  taskManager.filterTasks();
});
