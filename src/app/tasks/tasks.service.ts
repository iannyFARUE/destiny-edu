import { Injectable, signal } from '@angular/core';

import { type NewTaskData, type Task } from './task/task.model';

const STORAGE_KEY = 'tasks';

const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    userId: 'u1',
    title: 'Master Angular',
    summary: 'Learn all the basic and advanced features of Angular & how to apply them.',
    dueDate: '2025-12-31',
  },
  {
    id: 't2',
    userId: 'u3',
    title: 'Build first prototype',
    summary: 'Build a first prototype of the online shop website',
    dueDate: '2024-05-31',
  },
  {
    id: 't3',
    userId: 'u3',
    title: 'Prepare issue template',
    summary: 'Prepare and describe an issue template which will help with project management',
    dueDate: '2024-06-15',
  },
];

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal<Task[]>(this.loadTasks());
  readonly allTasks = this.tasks.asReadonly();

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.update((tasks) => [
      {
        id: crypto.randomUUID(),
        userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...tasks,
    ]);
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    this.saveTasks();
  }

  private loadTasks(): Task[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Corrupted or inaccessible storage — fall back to the defaults.
    }

    return INITIAL_TASKS;
  }

  private saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
  }
}
