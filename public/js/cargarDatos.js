function login(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
            var respuesta = JSON.parse(this.responseText);
            if (respuesta === true) {
                cargar_Categorias()
               document.getElementById("cabecera").style.display = "block";
                document.getElementById("login").style.display = "none";
                /*ponemos el usuario devuelto en el hueco correspondiente*/
                document.getElementById("cab_usuario").innerHTML = "Usuario: " + usuario;

            } else {
                alert("Revise usuario y contraseña");
            }
        }
    }

    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;
    var params = "usuario=" + usuario + "&password=" + password;
    xhttp.open("POST", "login", true);
    // envío con POST requiere cabecera y cadena de parámetros
    // Cuando es petición POST debemos poner el CSRF de Laravel.
    xhttp.setRequestHeader('X-CSRF-TOKEN', token);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


    xhttp.send(params);
    return false;
}

function cargar_Categorias(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("principal").style.display = "block";
            let contenido = document.getElementById("contenido");
            let titulo = document.getElementById("titulo");
            titulo.innerHTML = "Listado de Categorias";
            try {
                let categorias = JSON.parse(this.responseText);
                let tablaC = crearTablacategorias(categorias);
                contenido.innerHTML = "";
                contenido.appendChild(tablaC);
            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Error en categorias";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };
    xhttp.open("GET", "categorias", true);
    xhttp.send();
    return false;

}

function crearTablacategorias(categoria){
    let tabla = document.createElement("table");
    //tabla.classList.add("table");
    let Cab = crearFila([ "Nombre", "Descripcion"," ", "Acciones"], "th");
    tabla.appendChild(Cab);
    for (let i = 0; i < categoria.length; i++) {

        let boton_Ver= "<button onclick='cargar_productos("+categoria[i].id+");' class='btn btn-secondary btn-sm'>Ver Productos</button>"
        let boton_Editar= "<button onclick='editar_categoria("+categoria[i].id+");' class='btn btn-secondary btn-sm'>Editar</button>"
        let boton_Eliminar= "<button onclick='eliminar_categoria("+categoria[i].id+");' class='btn btn-secondary btn-sm'>Eliminar</button>"
        fila = crearFila([categoria[i].Nombre, categoria[i].Descripcion, boton_Ver, boton_Editar, boton_Eliminar], "td");
        tabla.appendChild(fila);
    }
    return tabla;
}

function crearFila(campos, tipo) {
    var fila = document.createElement("tr");
    for (var i = 0; i < campos.length; i++) {
        var celda = document.createElement(tipo);
        celda.innerHTML = campos[i];
        celda.style.textAlign = "center";
        fila.appendChild(celda);
    }
    return fila;
}

function editar_categoria(codigo_categoria){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("principal").style.display = "block";
            let contenido = document.getElementById("contenido");
            let titulo = document.getElementById("titulo");
            titulo.innerHTML = "Listado de Categorias";
            try {
                let categorias = JSON.parse(this.responseText);
                let tablaC = mostrar(categorias);
                contenido.innerHTML = "";
                contenido.appendChild(tablaC);
            }catch(e){
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Error en cargar categoria";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };
    xhttp.open("GET", "categoria/"+codigo_categoria, true);
    xhttp.send();
    return false;
}

function mostrar(Tcategorias){
    let form = document.createElement("form");
    let datos = ["Nombre", "Descripcion"];

    for (let i = 0; i < datos.length; i++) {
        let div = document.createElement("div");

        let label = document.createElement("label");
        label.setAttribute("for", datos[i].toLowerCase());
        label.textContent = datos[i] + ":";

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("id", datos[i].toLowerCase());
        input.setAttribute("name", datos[i].toLowerCase());
        input.setAttribute("value", Tcategorias[datos[i]]);

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    }

    let boton = document.createElement("button");
    boton.setAttribute("onclick", 'actualizarcategoria("' + Tcategorias.id + '");');
    boton.setAttribute("class", "btn btn-primary");
    boton.textContent = "Actualizar Categoria";

    form.appendChild(boton);
    return form;

}

function actualizarcategoria(id){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var respuesta = this.responseText;
                if(respuesta == true){
                    alert("“Categoría editada con éxito")
                cargar_Categorias()
                }else{
                    alert("Se produjo un error, no se pudo editar la Categoría");
                }

            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Se produjo un error, no se pudo editar la Categoría";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
    var params = "id=" + id +"&nombre=" + nombre + "&descripcion=" + descripcion;
    xhttp.open("POST", "categoria/update", true);
    xhttp.setRequestHeader('X-CSRF-TOKEN', token);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;

}

function Añadir_Categorias(){
    // let xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
            document.getElementById("principal").style.display = "block";
            let contenido = document.getElementById("contenido");
            let titulo = document.getElementById("titulo");
            titulo.innerHTML = "Añadir Categoria";
            try {
                //let Tcategorias = JSON.parse(this.responseText);
                let tablaC = añadir();
                contenido.innerHTML = "";
                contenido.appendChild(tablaC);
            }catch(e){
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Error en añadir categoria";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
    //     }
    // };
    //xhttp.open("POST", "categoria/create", true);
    //xhttp.send();
    return false;
}

function añadir(){
    let form = document.createElement("form");
    let datos = ["Nombre", "Descripcion"];

    for (let i = 0; i < datos.length; i++) {
        let div = document.createElement("div");

        let label = document.createElement("label");
        label.setAttribute("for", datos[i].toLowerCase());
        label.textContent = datos[i] + ":";

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("id", datos[i].toLowerCase());
        input.setAttribute("name", datos[i].toLowerCase());
        //input.setAttribute("value");

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    }

    let boton = document.createElement("button");
    boton.setAttribute("onclick", 'subircategoria();');
    boton.setAttribute("class", "btn btn-primary");
    boton.textContent = "Añadir Categoria";

    form.appendChild(boton);
    return form;

}

function subircategoria(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                alert("Categoría añadida con éxito");
                cargar_Categorias()

            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Se produjo un error, no se pudo añadir Categoría";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
    var params = "nombre=" + nombre + "&descripcion=" + descripcion;
    xhttp.open("POST", "categoria/store", true);
    xhttp.setRequestHeader('X-CSRF-TOKEN', token);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;

}

function eliminar_categoria(codigo_categoria){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {

                alert("Categoría eliminada con éxito");
                cargar_Categorias()
            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Se produjo un error, no se pudo eliminar la Categoría";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var params = "id=" + codigo_categoria;
    xhttp.open("POST", "categoria/delete", true);
    xhttp.setRequestHeader('X-CSRF-TOKEN', token);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}







//PRODUCTOS
function cargar_productos(codigo_categoria){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("principal").style.display = "block";
            let contenido = document.getElementById("contenido");
            let titulo = document.getElementById("titulo");
            titulo.innerHTML = "Listado de Categorias";
            try {
                let categorias = JSON.parse(this.responseText);
                let tablaC = crearTablaproductos(categorias);
                contenido.innerHTML = "";
                contenido.appendChild(tablaC);
            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Error en categorias";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };

    var params = "id=" + codigo_categoria;
    xhttp.open("GET", "productos/"+codigo_categoria, true);
    xhttp.send(params);
    return false;
}

function crearTablaproductos(producto){
    let tabla = document.createElement("table");
    //tabla.classList.add("table");
    let Cab = crearFila([ "Codigo", "Nombre","Descripcion ", "Stock","Acciones","Carrito"], "th");
    tabla.appendChild(Cab);
    for (let i = 0; i < producto.length; i++) {
       let boton_Eliminar= "<button onclick='eliminar_producto("+producto[i].id+");' class='btn btn-secondary btn-sm'>Eliminar Producto</button>";
        let compra ="<input type='number' name='añadir' min=1 max="+producto[i].Stock+" id='añadirP"+producto[i].id+"'>";
        let boton_Editar= "<button onclick='añadir_carrito("+producto[i].id+");' class='btn btn-secondary btn-sm'>Añadir</button>"

        fila = crearFila([producto[i].id, producto[i].Nombre, producto[i].Descripcion, producto[i].Stock, boton_Eliminar,compra,boton_Editar,], "td");
        tabla.appendChild(fila);
    }
    return tabla;
}

function Añadir_Productos(){

            document.getElementById("principal").style.display = "block";
            let contenido = document.getElementById("contenido");
            let titulo = document.getElementById("titulo");
            titulo.innerHTML = "Añadir Producto";
            try {

                let tablaC = añadirProducto();
                contenido.innerHTML = "";
                contenido.appendChild(tablaC);
            }catch(e){
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Error en añadir producto";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }

    return false;
}

function añadirProducto(){
    let form = document.createElement("form");
    let datos = ["Nombre", "Descripcion","peso", "Stock"];

    for (let i = 0; i < datos.length; i++) {
        let div = document.createElement("div");

        let label = document.createElement("label");
        label.setAttribute("for", datos[i].toLowerCase());
        label.textContent = datos[i] + ":";

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("id", datos[i].toLowerCase());
        input.setAttribute("name", datos[i].toLowerCase());

        div.appendChild(label);
        div.appendChild(input);

        // Agregar fila al formulario
        form.appendChild(div);
    }

    let div = document.createElement("div");

        let label = document.createElement("label");
        label.setAttribute("for", "categoria");
        label.textContent ="Categoria:";

        div.appendChild(label);

    let select = document.createElement("select");
    select.setAttribute("class", "form-control");
    select.setAttribute("id", "categoria");
    select.setAttribute("name", "categoria");

    // Realizar una solicitud AJAX a Laravel para obtener las categorías
    fetch('/categorias')
        .then(response => response.json())
        .then(categorias => {
            // Llenar el select con las categorías obtenidas
            categorias.forEach(categoria => {
                let option = document.createElement("option");
                option.value = categoria.id;
                option.text = categoria.Nombre;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener las categorías:', error);
        });


    div.appendChild(select);
    form.appendChild(div);

    // Crear botón de envío
    let boton = document.createElement("button");
    boton.setAttribute("onclick", 'subirProducto();');
    boton.setAttribute("class", "btn btn-primary");
    boton.textContent = "Añadir Producto";

    // Agregar el botón al formulario
    form.appendChild(boton);

    return form;

}

function subirProducto(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                alert("Producto añadido con éxito");
                cargar_Categorias()

            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Se produjo un error, no se pudo añadir Categoría";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var nombre = document.getElementById("nombre").value;
    var Descripcion = document.getElementById("descripcion").value;
    var peso = document.getElementById("peso").value;
    var Stock = document.getElementById("stock").value;
    var cod_cat = document.getElementById("categoria").value;
    var params = "nombre=" + nombre + "&Descripcion=" + Descripcion+ "&peso=" + peso+ "&Stock=" + Stock+ "&cod_cat=" + cod_cat;
    xhttp.open("POST", "productos/store", true);
    xhttp.setRequestHeader('X-CSRF-TOKEN', token);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;

}

function eliminar_producto(codigo_producto){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {

                alert("Producto eliminado con éxito");
                cargar_Categorias()
            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Se produjo un error, no se pudo eliminar la Categoría";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var param = "id=" + codigo_producto;
    xhttp.open("POST", "producto/delete", true);
    xhttp.setRequestHeader('X-CSRF-TOKEN', token);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(param);
    return false;
}






//Carrito
function cargarCarrito(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("principal").style.display = "block";
            let contenido = document.getElementById("contenido");
            let titulo = document.getElementById("titulo");
            titulo.innerHTML = "Carrito";
            try {
                let carrito = JSON.parse(this.responseText);
                if(carrito!=null){
                    let tablaC = crearTablaCarrito(carrito);
                    contenido.innerHTML = "";
                    contenido.appendChild(tablaC);
                }else{
                    let mensaje = document.createElement("p");
                    mensaje.innerHTML = "EL carrito esta vacio";
                    contenido.innerHTML = "";
                    contenido.appendChild(mensaje);
                }


            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Error en Carrito";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };


    xhttp.open("GET", "carrito", true);
    xhttp.send();
    return false;
}

function crearTablaCarrito(carrito){
        let tabla = document.createElement("table");
        //tabla.classList.add("table");
        let Cab = crearFila([ "Codigo", "Nombre","Descripcion ", "Unidades","Carrito"], "th");
        tabla.appendChild(Cab);
        for (let i = 0; i < carrito[0].length; i++) {
            let compra ="";
            let boton_Eliminar= "<input type='number' name='añadir' min=1 max="+carrito[0][i].unidades+" id='eliminarP"+carrito[0][i].id+"'><button onclick='eliminar_carrito("+carrito[0][i].id+");' class='btn btn-secondary btn-sm'>Eliminar</button>"

            fila = crearFila([carrito[0][i].id, carrito[1][i][0].Nombre, carrito[1][i][0].Descripcion, carrito[0][i].unidades,boton_Eliminar], "td");
            tabla.appendChild(fila);
        }
        return tabla;

}

function añadir_carrito(id){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                alert("Producto añadido con éxito");
                cargar_Categorias()

            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Se produjo un error, no se pudo añadir Categoría";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var numero = document.getElementById("añadirP"+id).value;
    var params = "id=" + id + "&numero=" + numero;
    xhttp.open("POST", "carrito/store", true);
    xhttp.setRequestHeader('X-CSRF-TOKEN', token);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}
function eliminar_carrito(codigo_producto){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {

                alert("Producto eliminado con éxito");
                cargar_Categorias()
            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Se produjo un error, no se pudo eliminar la Categoría";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var unidades = document.getElementById("eliminarP"+codigo_producto).value;
    var param = "id=" + codigo_producto+"&unidades="+unidades;
    xhttp.open("POST", "carrito/delete", true);
    xhttp.setRequestHeader('X-CSRF-TOKEN', token);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(param);
    return false;
}


function logout(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                if(true==this.responseText){
                     alert("Sesión cerrar con éxito");
                document.getElementById("principal").style.display = "none";
                document.getElementById("cabecera").style.display = "none";
                document.getElementById("login").style.display = "block";
                }


            } catch (e) {
                let mensaje = document.createElement("p");
                mensaje.innerHTML = "Se produjo un error, no se pudo cerrar sesion ";
                contenido.innerHTML = "";
                contenido.appendChild(mensaje);
            }
        }
    };

    xhttp.open("GET", "logout", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
    return false;
}
