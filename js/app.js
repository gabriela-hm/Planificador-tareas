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