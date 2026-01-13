const args = process.argv.slice(2);

const tasks = [
  {
    id: 1,
    description: 'Buy A Car',
    status: 'todo',
    createdAt: new Date('2026-01-13T21:24:11.482Z'),
    updatedAt: new Date('2026-01-13T21:24:11.482Z')
  },
  {
    id: 2,
    description: 'Go gym',
    status: 'done',
    createdAt: new Date('2026-01-13T21:24:11.482Z'),
    updatedAt: new Date('2026-01-13T21:24:11.482Z')
  },
  {
    id: 3,
    description: 'Finish Project',
    status: 'in-progress',
    createdAt: new Date('2026-01-13T21:24:11.482Z'),
    updatedAt: new Date('2026-01-13T21:24:11.482Z')
  },
];

function addTask(description) {
  const task = {
    id: tasks.length + 1,
    description,
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  tasks.push(task)
  console.log(tasks);
  console.log(`Task added successfully (ID: ${tasks.length})`);
}

function listAllTasks() {
  console.log('All tasks\n');
  tasks.forEach(task => {
    console.log(`Id: ${task.id} - ${task.description} (${task.status}) | Created: ${new Date(task.createdAt).toDateString()} - Updated: ${new Date(task.updatedAt).toDateString()}`);
  });
}

function updateTask({ taskId, newDescription }) {
  tasks[taskId - 1].description = newDescription;
  console.log(`Task updated successfully (ID: ${taskId})`);
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
  }
} else if (args[0] === 'update') {
  const taskId = args[1];
  const newDescription = args[2];
  if (!newDescription) console.error(`Please type a task description`);
  else updateTask({ taskId, newDescription });
}