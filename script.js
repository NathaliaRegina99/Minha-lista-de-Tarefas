"use strict";

const STORAGE_KEY = "minhaListaDeTarefas";
const priorities = ["Baixa", "Média", "Alta"];
const statuses = ["Pendente", "Concluída"];

const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const storageMessage = document.getElementById("storageMessage");

let tasks = loadTasks();

function isValidTask(task) {
    return task
        && typeof task.id === "string"
        && typeof task.title === "string"
        && task.title.trim() !== ""
        && typeof task.description === "string"
        && priorities.includes(task.priority)
        && statuses.includes(task.status);
}

function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);

        if (!savedTasks) {
            return [];
        }

        const parsedTasks = JSON.parse(savedTasks);
        return Array.isArray(parsedTasks) ? parsedTasks.filter(isValidTask) : [];
    } catch {
        showStorageWarning("Não foi possível carregar as tarefas salvas neste navegador.");
        return [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        showStorageWarning("");
    } catch {
        showStorageWarning("Não foi possível salvar as alterações no LocalStorage.");
    }
}

function showStorageWarning(message) {
    storageMessage.textContent = message;
    storageMessage.classList.toggle("d-none", message === "");
}

function createTaskId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createBadge(text, className) {
    const badge = document.createElement("span");
    badge.className = className;
    badge.textContent = text;
    return badge;
}

function renderTasks() {
    taskList.replaceChildren();

    taskCount.textContent = tasks.length === 1
        ? "1 tarefa"
        : `${tasks.length} tarefas`;

    if (tasks.length === 0) {
        const emptyColumn = document.createElement("div");
        emptyColumn.className = "col-12";

        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.textContent = "Cadastre uma tarefa.";

        emptyColumn.append(emptyState);
        taskList.append(emptyColumn);
        return;
    }

    tasks.forEach((task) => {
        const column = document.createElement("div");
        column.className = "col-12 col-md-6";

        const card = document.createElement("article");
        card.className = `card task-card${task.status === "Concluída" ? " is-completed" : ""}`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column p-4";

        const title = document.createElement("h3");
        title.className = "h5 task-title mb-2";
        title.textContent = task.title;

        const description = document.createElement("p");
        description.className = "task-description mb-3";
        description.textContent = task.description || "Sem descrição.";

        const badges = document.createElement("div");
        badges.className = "d-flex flex-wrap gap-2 mb-4";

        const priorityClass = {
            "Baixa": "priority-low",
            "Média": "priority-medium",
            "Alta": "priority-high"
        }[task.priority];

        const statusClass = task.status === "Concluída"
            ? "status-completed"
            : "status-pending";

        badges.append(
            createBadge(task.priority, `priority-badge ${priorityClass}`),
            createBadge(task.status, `status-badge ${statusClass}`)
        );

        const actions = document.createElement("div");
        actions.className = "d-flex flex-wrap gap-2 mt-auto";

        const statusButton = document.createElement("button");
        statusButton.type = "button";
        statusButton.className = "btn btn-sm btn-outline-primary";
        statusButton.dataset.action = "toggle-status";
        statusButton.dataset.id = task.id;
        statusButton.textContent = task.status === "Pendente"
            ? "Concluir"
            : "Voltar para pendente";
        statusButton.setAttribute(
            "aria-label",
            task.status === "Pendente"
                ? `Concluir tarefa: ${task.title}`
                : `Voltar tarefa para pendente: ${task.title}`
        );

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-sm btn-outline-danger";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = task.id;
        deleteButton.textContent = "Excluir";
        deleteButton.setAttribute("aria-label", `Excluir tarefa: ${task.title}`);

        actions.append(statusButton, deleteButton);
        cardBody.append(title, description, badges, actions);
        card.append(cardBody);
        column.append(card);
        taskList.append(column);
    });
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const priority = priorityInput.value;

    titleInput.setCustomValidity(title === "" ? "Informe o título da tarefa." : "");
    priorityInput.setCustomValidity(
        priorities.includes(priority) ? "" : "Selecione uma prioridade válida."
    );

    if (!taskForm.reportValidity()) {
        return;
    }

    tasks.unshift({
        id: createTaskId(),
        title,
        description: descriptionInput.value.trim(),
        priority,
        status: "Pendente"
    });

    saveTasks();
    renderTasks();
    taskForm.reset();
    titleInput.setCustomValidity("");
    priorityInput.setCustomValidity("");
    titleInput.focus();

    window.alert("Tarefa cadastrada com sucesso.");
});

titleInput.addEventListener("input", () => {
    titleInput.setCustomValidity("");
});

priorityInput.addEventListener("change", () => {
    priorityInput.setCustomValidity("");
});

taskList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const task = tasks.find((item) => item.id === button.dataset.id);

    if (!task) {
        return;
    }

    if (button.dataset.action === "toggle-status") {
        task.status = task.status === "Pendente" ? "Concluída" : "Pendente";
        saveTasks();
        renderTasks();
        return;
    }

    if (button.dataset.action === "delete") {
        const confirmed = window.confirm(`Deseja excluir a tarefa "${task.title}"?`);

        if (!confirmed) {
            return;
        }

        tasks = tasks.filter((item) => item.id !== task.id);
        saveTasks();
        renderTasks();
    }
});

renderTasks();