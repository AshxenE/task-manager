import {defineStore} from 'pinia'

import * as tasks from '@/jsons/tasks.json'

interface Task {
    id: number;
    title: string;
    email: string;
    description: string;
    status: number;
}

export const useTasksStore = defineStore({
    id: 'tasks-store',
    state: () => ({
        tasks: [] as Task[],
        pageSize: 3,
        currentPage: 1,
        sortKey: 'title',
        sortOrder: 'asc'
    }),
    actions: {
        loadTasks() {
            if (this.tasks.length === 0) {
                this.tasks = tasks.default;
            }
            return this.tasks;
        },
        setPage(page: number) {
            this.currentPage = page;
        },
        setSort(key: string) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
            }
            this.currentPage = 1;
        },
        addTask(task: Task[]) {
            const maxId = this.tasks.reduce((max, task) => Math.max(max, task.id), 0);
            task.id = maxId + 1;
            this.tasks.push(task);
        },
        editTask(task: Task[]) {
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                this.tasks[index] = task;
            }
        }
    },
    getters: {
        allTasks: (state) => state.tasks,
        paginatedTasks: (state) => {
            let sortedTasks = [...state.tasks].sort((a, b) => {
                if (state.sortOrder === 'asc') {
                    return a[state.sortKey] > b[state.sortKey] ? 1 : -1;
                } else {
                    return a[state.sortKey] < b[state.sortKey] ? 1 : -1;
                }
            });
            const start = (state.currentPage - 1) * state.pageSize;
            return sortedTasks.slice(start, start + state.pageSize);
        },
        totalPages: (state) => Math.ceil(state.tasks.length / state.pageSize)
    },
})
