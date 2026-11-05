//FONDO WEB 
document.addEventListener("DOMContentLoaded", () => {
  
  const misImagenes = [
    {
      url: "img/Berglandschaft.jpg", 
      titulo: "Primera Obra de Arte",
      autor: "Artista 1, 1889",
      descripcion: "Descripción de prueba para la primera obra."
    },
    {
      url: "img/boote in der.jpg", 
      titulo: "Segunda Obra de Arte",
      autor: "Artista 2, 1905",
      descripcion: "Descripción de prueba para la segunda obra."
    },
    {
      url: "img/florence.jpg",
      titulo: "Florence",
      autor: "Vista histórica",
      descripcion: "Representación artística de la hermosa ciudad de Florencia."
    }
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
});



//VALIDACION DE CAMPOS FORMULARIO NUEVA TAREA
function validFormFieldInput(data) {
  let isValid = true;

  if (!data.titulo || data.titulo.trim() === "") {
    console.log("Realiza un ajuste: El nombre no puede estar vacío.");
    isValid = false;
  }

  if (!data.categoria || data.categoria.trim() === ""){
    console.log("Realiza un ajuste: Tienes que elegir una categoria.")
  }

  if (!data.fecha || data.fecha.trim() === ""){
    console.log("Realiza un ajuste: Tienes que elegir una fecha.")
  }

  return isValid;
}
//capturar los daots al enviar el formulario
const formNuevaTarea = document.querySelector('#formNuevaTarea');
const alertaError = document.querySelector('#alertaError');
if(formNuevaTarea){
  formNuevaTarea.addEventListener('submit', function (event){
    event.preventDefault(); // que la pagina se recargue por defecto

    //identificar campos
    const nuevaTareaNombreInput = document.querySelector('#tituloTarea');
    const descripcionInput = document.querySelector('#descripcionTarea');
    const categoriaInput = document.querySelector('#categoriaTarea');
    const fechaInput= document.querySelector('#fechaTarea');
    const prioridadInput = document.querySelector('#prioridadTareaModal');

    const formData = {
      titulo: nuevaTareaNombreInput ? nuevaTareaNombreInput.value : '',
      descripcion: descripcionInput ? descripcionInput.value : '',
      categoria: categoriaInput ? categoriaInput.value : '',
      fecha: fechaInput ? fechaInput.value : '',
      prioridad: prioridadInput ? prioridadInput.value : ''
    }

    if (validFormFieldInput(formData)) {
      console.log("Todos los datos son correctos. Guardando tarea...");

      alertaError.classList.add('d-none');

      const modalElement = document.querySelector('#modalNuevaTarea');
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.hide();
      formNuevaTarea.reset();

    } else {
      console.log("Por favor, completa los campos requeridos.");

      alertaError.classList.remove('d-none')
    }

  })
}
//VALIDACION DE CAMPOS FORMULARIO SUBTAREA