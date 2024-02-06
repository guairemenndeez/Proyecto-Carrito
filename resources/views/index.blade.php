<!DOCTYPE html>
<html>
    <head>
        <title>menu</title>
        <meta charset = "UTF-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="{{ asset('bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
        <script type = "text/javascript" src ="{{ asset('js/cargarDatos.js') }}"></script>
    </head>
    <body>

        <div class="container-fluid">
            <div class="col-md-8 order-md-1">


                <section id="login">
                    <h4 class="mb-3">Login </h4>
                    <form onsubmit="return login()" method="POST" class="col-md-3 order-md-1">
                        <div class="form-group">
                        <label for="usuario">Usuario</label><br>
                        <input class="form-control" id="usuario" name="usuario" type="text"><br>
                        <label for="password">Password</label><br>
                        <input class="form-control" id="password" name="password" type="password"><br>
                        </div>
                        <input class="btn btn-primary" type="submit" >
                    </form>
                </section>

                <section id="cabecera" style="display:none">
                    <h4 class="mb-3">Menú:</h4>
                    <header>
                        <span id="cab_usuario"></span>
                        <nav class="navbar navbar-light bg-light">
                            <a> Menu: </a>
                            <a href="/categoria" onclick="return Añadir_Categorias();">Añadir Categorias</a>
                            <a href="/categorias " onclick="return cargar_Categorias();">Listado Categorias</a>
                            <a href="/" onclick="return Añadir_Productos();">Añadir Productos</a>
                            <a href="/carrito " onclick="return cargarCarrito()">Carrito</a>
                            <a href="/logout " onclick="return logout()">Cerrar sesión</a>
                        </nav>
                    </header>
                </section>


                <section id = "principal" style="display:none">
                    <hr>
                    <h2 id = "titulo"></h2>
                    <section id = "contenido">
                    </section>
                    <!-- <section id = "procesar">
                    </section> -->
                </section>
            </div>
        </div>





</body>
</html>
