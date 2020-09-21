//Variables
const carrito = document.getElementById('carrito')
const cursos = document.getElementById('lista-cursos')
const listaCursos=document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.getElementById("vaciar-carrito")

//Listeners

cargarEventListeners();
function cargarEventListeners() {
    //Dispara cuando se presiona "Agregar Curso"
    cursos.addEventListener("click",comprarCurso)

    //Cuando se elimina un curso
    carrito.addEventListener("click",eliminarCurso)

    //Al Vaciar Carrito

    vaciarCarritoBtn.addEventListener("click",vaciarCarrito)

    //Al Cargar documento Mostrar Local Storage

    document.addEventListener('DOMContentLoaded',leerLocalStorage)

}
//Functioners

//Funcion añade curso al carrito
function comprarCurso(e) {
  e.preventDefault()

  //delegacion para agrear carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;

        //enviamos el curso seleccionado
        leerDatosCurso(curso)
    }

}

//Lee los datos del curso

function leerDatosCurso(curso){


    const infoCurso ={
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector("h4").textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector("a").getAttribute('data-id')

    }

    insertarCarrito(infoCurso)


    // console.log(infoCurso);
}

//Muesta el Curso en el Carrito

function insertarCarrito(curso) {
    const row = document.createElement('tr')

    row.innerHTML=`
    <td>
        <img src="${curso.imagen}" width="100"/>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    
    `;

    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso)

}
//Elimina el curso del Carrito
function eliminarCurso(e) {
    e.preventDefault()

    let curso,cursoId;

    if (e.target.classList.contains("borrar-curso")) {
        e.target.parentElement.parentElement.remove()

        curso=e.target.parentElement.parentElement
        cursoId=curso.querySelector("a").getAttribute("data-id")
    }

    eliminarCursoLocalStorage(cursoId)
}

//Funcion Vaciar Carrito

function vaciarCarrito() {
    //forma lenta
    listaCursos.innerHTML="";

    //forma rapida

    while (listaCursos.firstChild) {
        listaCursos.firstChild(listaCursos.firstChild)
    }

   

    //Vaciar Local Storage

    vaciarLocalStorage()
    return false;
}

//almacena curso en local
function guardarCursoLocalStorage(curso) {
   let cursos

   cursos=obtenerCursoLocalStorage()

   //EL Curso seleccionado se agrega al arreglo
   cursos.push(curso)

   localStorage.setItem('cursos',JSON.stringify(cursos))
}

function obtenerCursoLocalStorage() {
    let cursosLS

    //Comprobamos si hay algo en local storage
    if (localStorage.getItem('cursos')===null) {
        cursosLS=[]
    }
    else(
        cursosLS = JSON.parse(localStorage.getItem('cursos'))
    )

    return cursosLS;
}

//imprime las funciones de ls en el carrito
function leerLocalStorage() {
    let cursosLS

    cursosLS = obtenerCursoLocalStorage();

    cursosLS.forEach(curso => {
        const row = document.createElement('tr')

        row.innerHTML=`
        <td>
            <img src="${curso.imagen}" width="100"/>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        
        `;
        listaCursos.appendChild(row);
    });
}

function eliminarCursoLocalStorage(curso) {
    let cursosLS = obtenerCursoLocalStorage()

    cursosLS.forEach((cursoLS,index)=>{
            if (cursoLS.id == curso) {
                cursosLS.splice(index,1)
            }
    })

    localStorage.setItem("cursos",JSON.stringify(cursosLS))
}

//Elimina Cursos de LS
function vaciarLocalStorage() {
    localStorage.clear
}