const Task = require('../models/taskModel');

// Lấy tất cả task
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Thêm task mới
const addTask = async (req, res) => {
  const { name, description, dueDate, assignedTo, priority, status } = req.body;
  const newTask = { name, description, dueDate, assignedTo, priority, status };

  try {
    const result = await Task.addTask(newTask);
    // Lấy lại task vừa thêm
    const addedTask = { ...newTask, id: result.insertId }; // result.insertId là ID của task vừa được thêm
    res.status(201).json({
      message: 'Task added successfully',
      data: addedTask, // Trả về task được thêm
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Cập nhật task
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const taskUpdates = req.body;

  try {
    // Cập nhật task trong cơ sở dữ liệu
    const result = await Task.updateTask(taskId, taskUpdates);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Sau khi cập nhật, truy vấn lại task từ cơ sở dữ liệu để lấy thông tin mới nhất
    const updatedTask = await Task.getTaskById(taskId);

    res.json({
      message: 'Task updated successfully',
      data: updatedTask, // Trả về toàn bộ dữ liệu của task, bao gồm các trường không thay đổi
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Xóa task
const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const result = await Task.deleteTask(taskId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
