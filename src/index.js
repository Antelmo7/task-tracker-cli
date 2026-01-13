#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
const __dirname = import.meta.dirname;

const args = process.argv.slice(2);

const tasksFilePath = path.join(__dirname, 'tasks.json');

function readTasks() {
  if (!fs.existsSync(tasksFilePath)) {
    try {
      const tasks = [];
      fs.writeFileSync(tasksFilePath, JSON.stringify(tasks));
      return tasks;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const tasks = fs.readFileSync(tasksFilePath, 'utf8');
      return JSON.parse(tasks);
    } catch (error) {
      console.error(error)
    }
  }
}

function updateTasksFile(tasks) {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks));
  } catch (error) {
    console.error(error);
  }
}

function addTask(description) {
  const tasks = readTasks();

  const task = {
    id: (tasks.length === 0) ? 1 : parseInt(tasks[tasks.length - 1].id) + 1,
    description,
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  tasks.push(task)
  updateTasksFile(tasks);
  console.log(`Task added successfully (ID: ${task.id})`);
}

function listAllTasks() {
  const tasks = readTasks();

  if (tasks.length < 1) {
    console.log('No tasks yet');
  } else {
    console.log('All tasks\n');
    tasks.forEach(task => {
      console.log(`Id: ${task.id} - ${task.description} (${task.status}) | Created: ${new Date(task.createdAt).toDateString()} - Updated: ${new Date(task.updatedAt).toDateString()}`);
    });
  }
}

function listTasksByStatus(status) {
  const tasks = readTasks();

  tasks.forEach(task => {
    if (task.status === status)
      console.log(`Id: ${task.id} - ${task.description} (${task.status}) | Created: ${new Date(task.createdAt).toDateString()} - Updated: ${new Date(task.updatedAt).toDateString()}`);
  });
}

function updateTask({ taskId, newDescription }) {
  const tasks = readTasks();
  const taskToUpdateIndex = tasks.findIndex(task => task.id == taskId);

  if (taskToUpdateIndex < 0) {
    console.error(`Task with ID: ${taskId} does not exist`);
  } else {
    tasks[taskToUpdateIndex].description = newDescription;
    updateTasksFile(tasks);
    console.log(`Task updated successfully (ID: ${taskId})`);
  }
}

function deleteTask(taskId) {
  const tasks = readTasks();
  const taskToUpdateIndex = tasks.findIndex(task => task.id == taskId);

  if (taskToUpdateIndex < 0) {
    console.error(`Task with ID: ${taskId} does not exist`);
  } else {
    tasks.splice(taskToUpdateIndex, 1);
    updateTasksFile(tasks);
    console.log(`Task deleted successfully (ID: ${taskId})`);
  }
}

function changeTaskStatus({ taskId, status }) {
  const tasks = readTasks();
  const taskToUpdateIndex = tasks.findIndex(task => task.id == taskId);

  if (taskToUpdateIndex < 0) {
    console.error(`Task with ID: ${taskId} does not exist`);
  } else {
    tasks[taskToUpdateIndex].status = status;
    updateTasksFile(tasks);
    console.log(`Task updated successfully (ID: ${taskId})`);
  }
}

if (args[0] === 'help' || args.length < 1) {
  console.log(`
      ## Adding a new task:
      task-cli add "Buy groceries"
      ### Output: Task added successfully (ID: 1)

      ## Updating and deleting tasks:
      task-cli update 1 "Buy groceries and cook dinner"
      task-cli delete 1

      ## Marking a task as in progress or done:
      task-cli mark-in-progress 1
      task-cli mark-done 1

      ## Listing all tasks:
      task-cli list

      ## Listing tasks by status:
      task-cli list done
      task-cli list todo
      task-cli list in-progress
    `);
}

if (args[0] === 'add') {
  const description = args.slice(1).join(" "); // Join the words after the "add" sub command
  if (!description) {
    console.error(`Please type a task description`);
  } else {
    addTask(description);
  }
} else if (args[0] === 'list') {
  const status = args[1];

  if (!status) {
    listAllTasks();
  } else {
    listTasksByStatus(status);
  }
} else if (args[0] === 'update') {
  const taskId = args[1];
  const newDescription = args[2];

  if (!newDescription) console.error(`Please type a task description`);
  else updateTask({ taskId: parseInt(taskId), newDescription });
} else if (args[0] === 'delete') {
  const taskId = args[1];

  if (!taskId) console.error(`Please type a task ID`);
  else deleteTask(parseInt(taskId));
} else if (args[0] === 'mark-in-progress') {
  const taskId = args[1];

  if (!taskId) console.error(`Please type a task ID`);
  else changeTaskStatus({ taskId: parseInt(taskId), status: 'in-progress' });
} else if (args[0] === 'mark-done') {
  const taskId = args[1];

  if (!taskId) console.error(`Please type a task ID`);
  else changeTaskStatus({ taskId: parseInt(taskId), status: 'done' });
}