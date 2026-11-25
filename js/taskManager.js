class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, dueDate, categoria, prioridad) {
    this.currentId++;

    this.tasks.push({
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      categoria: categoria,
      prioridad: prioridad
    });
  }

  deleteTask(taskId) {
    const newTaks = [];

    for (let task of this.tasks) {
      if (task.id !== taskId) {
        newTaks.push(task);
      }
    }
    this.tasks = newTaks;
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks))
  }

load() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    this.tasks = JSON.parse(savedTasks);

    this.currentId = this.tasks.reduce((maxId, task) => {
      return Math.max(maxId, Number(task.id));
    }, 0);
  }
}
  
  render() {
    const listaTareas = document.querySelector(".lista-tareas");

    if (!listaTareas) {
      return;
    }

    listaTareas.innerHTML = "";
    for (let task of this.tasks) {
      const tarjeta = document.createElement("article");

      tarjeta.classList.add("tarjeta-tarea");
      tarjeta.dataset.taskId = task.id;  

      tarjeta.innerHTML =
        `<div class="tarea-check">
        <input 
          type="checkbox" 
          class="form-check-input check-completar" 
          id="tarea-${task.id}"
          aria-label="Marcar tarea como completada"
        />
      </div>

      <div class="tarea-contenido">
        <div class="tarea-header-info">
          <h4 class="tarea-nombre">${task.name}</h4>

          <span class="badge badge-categoria">
            ${task.categoria}
          </span>

          <span class="badge badge-prioridad prioridad-${task.prioridad}">
            ${task.prioridad}
          </span>
        </div>

        <p class="tarea-descripcion">
          ${task.description}
        </p>

        <div class="tarea-meta">
          <span class="tarea-fecha">
            <i class="fa-regular fa-calendar"></i>
            ${task.dueDate}
          </span>

          <button 
            type="button" 
            class="btn-subtarea"
          >
            <i class="fa-solid fa-square-plus"></i>
            Agregar subtarea
          </button>
        </div>

        <ul class="lista-subtareas">
        </ul>
      </div>

      <div class="tarea-acciones">
        <button 
          type="button" 
          class="btn-accion btn-editar" 
          title="Editar tarea"
        >
          <i class="fa-solid fa-pen"></i>
        </button>

        <button 
          type="button" 
          class="btn-accion btn-borrar delete-button" 
          title="Eliminar tarea"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>`;

      listaTareas.appendChild(tarjeta);
    }
  }
}