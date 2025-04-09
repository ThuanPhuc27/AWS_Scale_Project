CREATE TABLE tasks
(
  id INT
  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR
  (255) NOT NULL,
  description TEXT NOT NULL,
  dueDate DATE NOT NULL,
  assignedTo VARCHAR
  (255) NOT NULL,
  priority ENUM
  ('Low', 'Medium', 'High') DEFAULT 'Low',
  status ENUM
  ('To Do', 'In Progress', 'Review', 'Done') DEFAULT 'To Do'
);
