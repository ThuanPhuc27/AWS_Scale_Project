const express = require('express');
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.get('/all', getTasks);
router.post('/add', addTask);
router.put('/:id/update', updateTask);
router.delete('/:id/delete', deleteTask);

module.exports = router;
