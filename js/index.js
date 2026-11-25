const taskManager = new TaskManager();
taskManager.load();
taskManager.render();

console.log("Tareas recuperadas:", taskManager.tasks);

//FONDO WEB
document.addEventListener("DOMContentLoaded", () => {
  const misImagenes = [
    {
      url: "img/Berglandschaft.jpg",
      titulo: "Primera Obra de Arte",
      autor: "Artista 1, 1889",
      descripcion: "Descripción de prueba para la primera obra.",
    },
    {
      url: "img/boote in der.jpg",
      titulo: "Segunda Obra de Arte",
      autor: "Artista 2, 1905",
      descripcion: "Descripción de prueba para la segunda obra.",
    },
    {
      url: "img/florence.jpg",
      titulo: "Florence",
      autor: "Vista histórica",
      descripcion:
        "Representación artística de la hermosa ciudad de Florencia.",
    },
  ];

  let indiceActual = 0;

  function cambiarFondo(index) {
    const obra = misImagenes[index];
    //  la imagen al body de forma limpia
    document.body.style.backgroundImage = `url('${obra.url}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    //  los textos del cuadro flotante inferior
    document.getElementById("arteTitulo").textContent = obra.titulo;
    document.getElementById("arteAutor").textContent = obra.autor;
    document.getElementById("arteDescripcion").textContent = obra.descripcion;
  }

  // Cargar una imagen aleatoria al abrir la web
  indiceActual = Math.floor(Math.random() * misImagenes.length);
  cambiarFondo(indiceActual);

  //  clic en el cuadro flotante de abajo, cambia a la siguiente imagen
  const cuadroArte = document.getElementById("cuadroArteInfo");
  if (cuadroArte) {
    cuadroArte.style.cursor = "pointer";
    cuadroArte.title = "Haz clic para cambiar de obra de arte";

    cuadroArte.addEventListener("click", () => {
      indiceActual = (indiceActual + 1) % misImagenes.length;
      cambiarFondo(indiceActual);
    });
  }

  //SUBRAYADO DE TAREA COMPLETADA
  const checksCompletar = document.querySelectorAll(".check-completar");
  checksCompletar.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const tarjetaTarea = event.target.closest(".tarjeta-tarea");

      if (tarjetaTarea) {
        if (event.target.checked) {
          tarjetaTarea.classList.add("tarea-completada");
        } else {
          tarjetaTarea.classList.remove("tarea-completada");
        }
      }
    });
  });

  //ELIMINAR TAREA
  document.addEventListener("click", (event) =>{
    if (event.target.closest(".delete-button")) {
      const botonEliminar = event.target.closest(".delete-button");
      const tarjetaTarea = botonEliminar.closest(".tarjeta-tarea");
      if(tarjetaTarea){
        const taskId = Number(tarjetaTarea.dataset.taskId);
        
        console.log("Tarjeta seleccionada:", tarjetaTarea);
        console.log("ID de la tarjeta:", taskId);
        console.log("Todas las tarjetas:", document.querySelectorAll(".tarjeta-tarea"));
        
        taskManager.deleteTask(taskId);
        taskManager.save();
        tarjetaTarea.remove();
        console.log("Tareas después de eliminar:", taskManager.tasks);
      }
    }
  });

  //SUBRAYADO DE SUBTAREA COMPLETADA
  document.addEventListener("change", (event) => {
    if (
      event.target.matches(".subtarea-item input[type='checkbox']") ||
      event.target.matches(".lista-subtareas input[type='checkbox']")
    ) {
      const subtareaItem = event.target.closest(".subtarea-item");
      const label = subtareaItem ? subtareaItem.querySelector("label") : null;

      if (label) {
        if (event.target.checked) {
          label.classList.add("subtarea-completada");
        } else {
          label.classList.remove("subtarea-completada");
        }
      }
    }
  });

  //VALIDACION DE CAMPOS FORMULARIO NUEVA TAREA
  function validFormFieldInput(data) {
    let isValid = true;

    if (!data.titulo || data.titulo.trim() === "") {
      console.log("Realiza un ajuste: El nombre no puede estar vacío.");
      isValid = false;
    }

    if (!data.categoria || data.categoria.trim() === "") {
      console.log("Realiza un ajuste: Tienes que elegir una categoria.");
    }

    if (!data.fecha || data.fecha.trim() === "") {
      console.log("Realiza un ajuste: Tienes que elegir una fecha.");
      isValid = false;
    }

    return isValid;
  }
  //capturar los daots al enviar el formulario
  const formNuevaTarea = document.querySelector("#formNuevaTarea");
  const alertaError = document.querySelector("#alertaError");
  if (formNuevaTarea) {
    formNuevaTarea.addEventListener("submit", function (event) {
      event.preventDefault(); // que la pagina se recargue por defecto

      //identificar campos
      const nuevaTareaNombreInput = document.querySelector("#tituloTarea");
      const descripcionInput = document.querySelector("#descripcionTarea");
      const categoriaInput = document.querySelector("#categoriaTarea");
      const fechaInput = document.querySelector("#fechaTarea");
      const prioridadInput = document.querySelector("#prioridadTareaModal");

      const formData = {
        titulo: nuevaTareaNombreInput ? nuevaTareaNombreInput.value : "",
        descripcion: descripcionInput ? descripcionInput.value : "",
        categoria: categoriaInput ? categoriaInput.value : "",
        fecha: fechaInput ? fechaInput.value : "",
        prioridad: prioridadInput ? prioridadInput.value : "",
      };

      if (validFormFieldInput(formData)) {
        console.log("Todos los datos son correctos. Guardando tarea...");

        taskManager.addTask(
          formData.titulo,
          formData.descripcion,
          formData.fecha,
          formData.categoria,
          formData.prioridad
        );
        
        taskManager.save();
        taskManager.render();

        console.log("Tarea registrada:", taskManager.tasks);
        alertaError.classList.add("d-none");
      
        const modalElement = document.querySelector("#modalNuevaTarea");
        const modalInstance =
          bootstrap.Modal.getInstance(modalElement) ||
          new bootstrap.Modal(modalElement);

        modalInstance.hide();

        formNuevaTarea.reset();
      }
    });
  }

  //VALIDACION DE CAMPOS FORMULARIO SUBTAREA
  const formNuevaSubtarea = document.querySelector("#formNuevaSubtarea");
  const alertaErrorSubtarea = document.querySelector('#alertaErrorSubtarea');
  if (formNuevaSubtarea) {
    formNuevaSubtarea.addEventListener("submit", function (event) {
      event.preventDefault();

      const inputTituloSubtarea = document.querySelector("#tituloSubtarea");
      const textoSubtarea = inputTituloSubtarea
        ? inputTituloSubtarea.value.trim()
        : "";

      if (textoSubtarea === "") {
        console.log(
          "Realiza un ajuste: El nombre de la subtarea no puede estar vacío.",
        );

        if (alertaErrorSubtarea) {
          alertaErrorSubtarea.classList.remove("d-none");
        }
        return;
      }

      if (alertaErrorSubtarea) {
        alertaErrorSubtarea.classList.add("d-none");
      }
      console.log("Subtarea válida, Agregandi a la lista...");

      const modalSubtareaEl = document.querySelector("#modalNuevaSubtarea");
      const modalSubtareaInstance =
        bootstrap.Modal.getInstance(modalSubtareaEl) ||
        new bootstrap.Modal(modalSubtareaEl);
      modalSubtareaInstance.hide();
      formNuevaSubtarea.reset();
    });
  }


  //FUNCIONALIDAD BOTÓN CALENDARIO
const botonCalendario = document.querySelector(".btn-icono");
const calendario = document.querySelector("#CalendarioFlotante");
const contenedorCalendario = document.querySelector(".contenedor-calendario");

if (botonCalendario && calendario) {
  botonCalendario.addEventListener("click", (event) => {
    event.stopPropagation();

    calendario.classList.toggle("activo");
  });
}

// Cerrar el calendario al hacer clic fuera
document.addEventListener("click", (event) => {
  if (
    contenedorCalendario &&
    calendario &&
    !contenedorCalendario.contains(event.target)
  ) {
    calendario.classList.remove("activo");
  }
});

});
