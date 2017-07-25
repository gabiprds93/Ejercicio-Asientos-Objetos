var imputNombre = document.getElementById("nombre");
var imputApellido = document.getElementById("apellido");
var imputDni = document.getElementById("dni");
var imputAsiento = document.getElementById("asiento");
var contenedorListar = document.getElementById("listar");
var bus = new Bus();
for(var i = 0; i < bus.celdas.length; i++)
{
    bus.celdas[i].onclick = function(event){
        bus.redirect(event);
    };
    bus.pasajeros[i] = new Pasajero(undefined, undefined, undefined, undefined);
}

function Pasajero(nombre, apellido, dni, asiento)
{
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.asiento = asiento;
    this.mostrar = function()
    {
        if(this.nombre != undefined)
        {
            imputNombre.value = this.nombre;
            imputApellido.value = this.apellido;
            imputDni.value = this.dni;
            imputAsiento.value = this.asiento;
        }
        else
        {
            this.limpiarTodo(false);
        }
    }
    this.limpiarTodo = function(todo)
    {
        imputNombre.value = "";
        imputApellido.value = "";
        imputDni.value = "";
        if(todo)
        {
            imputAsiento.value = "";
        }
    }
}

function Bus()
{
    this.pasajeros = [];
    this.numAsiento = 0;
    this.celdas = document.getElementsByTagName("td");
    this.redirect = function(event)
    {
        this.numAsiento = (event.target.textContent);
        imputAsiento.value = this.numAsiento;
        this.pasajeros[this.numAsiento - 1].mostrar();
        imputNombre.focus();
        contenedorListar.innerHTML = "";
    }
    
    this.reservar = function(){
        if(imputAsiento.value != "" && imputNombre.value != "" && imputApellido.value != "" && imputDni.value != "")
        {
            this.pasajeros[this.numAsiento - 1] = new Pasajero(imputNombre.value, imputApellido.value, imputDni.value, this.numAsiento);
            this.pasajeros[0].limpiarTodo(true);
            for(var i in this.celdas)
            {
                if(this.celdas[i].textContent == this.numAsiento)
                {
                    this.celdas[i].firstChild.style = "background-color: #ffd1a3";
                    break;
                }
            }
        }
        else
        {
            alert("Faltan datos");
            imputNombre.focus();
        }
    }
    this.cancelar = function(){
        if(this.pasajeros[this.numAsiento - 1].nombre != undefined)
        {
            this.pasajeros[this.numAsiento - 1] = new Pasajero(undefined, undefined, undefined, undefined);
            this.pasajeros[0].limpiarTodo(true);
        }
        for(var i in this.celdas)
        {
            if(this.celdas[i].textContent == this.numAsiento)
            {
                this.celdas[i].firstChild.style.backgroundColor = "";
                break;
            }
        }
    }
    this.buscar = function(){
        var dniBuscar = document.getElementById("dniBuscar");
        for(var i in this.pasajeros)
        {
            if(dniBuscar.value == this.pasajeros[i].dni)
            {
                this.pasajeros[i].mostrar();
                break;
            }
            else
            {
                if(i == this.pasajeros.length - 1)
                {
                    this.pasajeros[0].limpiarTodo(true);
                    alert("No se encontro el DNI");
                }
            }
        }
        dniBuscar.value = "";
        dniBuscar.focus();
    }
    this.listar = function(){
        var contenedor = "";
        for(var i in this.pasajeros)
        {
            if(this.pasajeros[i].nombre != undefined)
            {
                contenedor += "<p><b>Nombre:</b> " + this.pasajeros[i].nombre + "<br>";
                contenedor += "<b>Apellido:</b> " + this.pasajeros[i].apellido + "<br>";
                contenedor += "<b>DNI:</b> " + this.pasajeros[i].dni + "<br>";
                contenedor += "<b>Asiento:</b> " + this.pasajeros[i].asiento + "</p>";
            }
        }
        contenedorListar.innerHTML = contenedor;
    }
}