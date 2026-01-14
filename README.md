# task-tracker-cli
CLI Task manager project to practice working with the filesystem, handling user inputs, and building a simple CLI application.

The user is able to:
- Add, Update, and Delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress

## Install package
Run: `npm i -g vetasks` to install the package globally

## Adding a new task
vetasks add "Buy groceries"

### Output: Task added successfully (ID: 1)

## Updating and deleting tasks
vetasks update 1 "Buy groceries and cook dinner"

vetasks delete 1

## Marking a task as in progress or done
vetasks mark-in-progress 1

vetasks mark-done 1

## Listing all tasks
vetasks list

## Listing tasks by status
vetasks list done

vetasks list todo

vetasks list in-progress
