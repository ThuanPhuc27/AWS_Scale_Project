const { promisePool } = require('../config/db'); // Đảm bảo bạn đã cấu hình db.js đúng

// Lấy tất cả task
const getTasks = async () => {
  try {
    const [tasks] = await promisePool.query('SELECT * FROM tasks');
    return tasks;
  } catch (error) {
    throw new Error('Error fetching tasks: ' + error.message);
  }
};

// Lấy task theo ID
const getTaskById = async (id) => {
  const query = 'SELECT * FROM tasks WHERE id = ?';
  try {
    const [result] = await promisePool.query(query, [id]);
    return result;
  } catch (error) {
    throw new Error('Error adding task: ' + error.message);
  }
};

// Thêm task mới
const addTask = async (task) => {
  const query = `INSERT INTO tasks (name, description, dueDate, assignedTo, priority, status)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    const [result] = await promisePool.query(query, [
      task.name,
      task.description,
      task.dueDate,
      task.assignedTo,
      task.priority,
      task.status,
    ]);
    return result;
  } catch (error) {
    throw new Error('Error adding task: ' + error.message);
  }
};

const updateTask = async (id, task) => {
  // Bắt đầu xây dựng query động
  let query = 'UPDATE tasks SET';
  const values = [];

  // Kiểm tra và thêm trường vào query nếu có dữ liệu
  if (task.name) {
    query += ' name = ?,';
    values.push(task.name);
  }
  if (task.description) {
    query += ' description = ?,';
    values.push(task.description);
  }
  if (task.dueDate) {
    query += ' dueDate = ?,';
    values.push(task.dueDate);
  }
  if (task.assignedTo) {
    query += ' assignedTo = ?,';
    values.push(task.assignedTo);
  }
  if (task.priority) {
    query += ' priority = ?,';
    values.push(task.priority);
  }
  if (task.status) {
    query += ' status = ?,';
    values.push(task.status);
  }

  // Nếu không có trường nào cần cập nhật, trả về error
  if (values.length === 0) {
    throw new Error('No fields to update');
  }

  // Loại bỏ dấu phẩy thừa ở cuối query
  query = query.slice(0, -1);

  // Thêm điều kiện WHERE vào query
  query += ' WHERE id = ?';
  values.push(id); // Thêm ID vào mảng giá trị để thay thế trong câu query

  try {
    // Thực hiện câu lệnh cập nhật với các giá trị đã chuẩn bị
    const [result] = await promisePool.query(query, values);
    return result;
  } catch (error) {
    throw new Error('Error updating task: ' + error.message);
  }
};

// Xóa task
const deleteTask = async (id) => {
  const query = `DELETE FROM tasks WHERE id = ?`;
  try {
    const [result] = await promisePool.query(query, [id]);
    return result;
  } catch (error) {
    throw new Error('Error deleting task: ' + error.message);
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask, getTaskById };
