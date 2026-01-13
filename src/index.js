const args = process.argv.slice(2);

const tasks = [];

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

if (args[0] === 'add') {
  const description = args.slice(1).join(" "); // Join the words after the "add" sub command
  if (!description) {
    console.error(`Please type a task description`);
  } else {
    addTask(description);
  }
}