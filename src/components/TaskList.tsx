import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import { v4 as uuid } from 'uuid';
uuid();

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  // Desestruturando array
  // Generic -> <Task[]>
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return;

    const newTask = {
      id: uuid(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(OldState => [...OldState, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // Verificação de: se a task.id for igual ao ID
    const newTasks = tasks.map(task => task.id === id ? { 
      // obtendo a task antiga
      ...task, 
      // sobrescrevendo uma propriedade
      isComplete: !task.isComplete,
      // retorna a task do jeito que ela estava
    } : task );

    setTasks(newTasks);
  }

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    // Verificação de: se a task.id for diferente do ID
    const filterTask = tasks.filter(task => task.id !== id)

    setTasks(filterTask);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}