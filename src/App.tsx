import { FC, ChangeEvent, useState } from 'react';

import { ITask } from './Interfaces';
import { TodoTask } from './components/TodoTask';

import './App.css';

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
    }
    else {
      setDeadline(+event.target.value);
    }
  }

  const addTask = (): void => { 
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  }

  const completeTask = (taskNameToDelete:string): void => {
    setTodoList(todoList.filter((task) => task.taskName !== taskNameToDelete));
   }

  
  return (
    <div className="App">
      <div className='header'>
        <div className='inputs-container'>
          <input type="text" placeholder='Task...' name='task' onChange={handleChange} value={ task} />

          <input type="number" placeholder='Deadline (in Days)...' name='deadline' onChange={handleChange} value={ deadline} />
          </div>

        <button onClick={ addTask}>Add Task</button>
      </div>

      <div className='todo-list'>
        {todoList.map((task: ITask, key: number) => <TodoTask key={key} task={task} completeTask={ completeTask} />)}
        
      </div>

     
    </div>
  );
}

export default App;
