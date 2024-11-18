/* Creacion Fake de un CRUD */

/* Variables Globales */
const d = document, w = window;
let registros = [];
let idRegistro = 0;


/* Datos Vehiculo */
var placa = d.getElementById('placaVehiculo'),
marca = d.getElementById('marcaVehiculo'),
modelo = d.getElementById('modeloVehiculo'),
pasajeros = d.getElementById('pasajerosVehiculo'),
color = d.getElementById('colorVehiculo'),
clase = d.getElementById('claseVehiculo');

/* Datos Titular */
var tipoDocumento = d.getElementById('tipoDocumento'),
numeroDocumento = d.getElementById('numeroDocumento'),
ciudades = d.getElementById('ciudades'),
primerNombre = d.getElementById('primerNombre'),
segundoNombre = d.getElementById('segundoNombre'),
primerApellido = d.getElementById('primerApellido'),
segundoApellido = d.getElementById('segundoApellido');

/* Conseguir Botones */
const btnRegistro = d.getElementById('botonRegistro');
const btnActualizar = d.getElementById('botonActualizar');

/* Evento para guardar el registro */
btnRegistro.addEventListener('click', ()=> {
  validarClase();
  if (clase.value != '') {
    validarDocumento();
    if (!validarDatos()) {
      if (validarPlaca() != 1) {
        guardarRegistro(registro());
      } else {
        alert("el vehiculo de placa: " + placa.value + " Ya esta registrado")
      }
    }
  }
})

/* Evento para guardar el registro actualizado */
btnActualizar.addEventListener('click', ()=>{
  if (!validarDatos()) {
    let match = numeroDocumento.value.match(validarDocumento());
    if (match == null || match[0] != numeroDocumento.value) {
      alert("Recuerde el tipo de formato del numero de documento");
    }else{
      guardarRegistroAct();
    }
  }
})

/* Funcion con el registor a registrar */
function registro() {
  let registro = [
    idRegistro,
    placa.value,
    marca.value,
    modelo.value,
    pasajeros.value,
    color.value,
    clase.value,
    tipoDocumento.value,
    numeroDocumento.value,
    ciudades.value,
    primerNombre.value,
    segundoNombre.value,
    primerApellido.value,
    segundoApellido.value,
  ]
  setearValores();
  return registro
}
/* Funcion para actualizar la tabla */
const actualizarTablaHTML = (registros)=>{
  const bodyTabla = d.getElementById('bodyTabla');
  var registrosHTML = '';
  for (let i = 0; i < registros.length; i++) {
    registrosHTML += `
      <tr>
        <td>${registros[i][1]}</td>
        <td>${registros[i][2]}</td>
        <td>${registros[i][3]}</td>
        <td>${registros[i][4]}</td>
        <td>${registros[i][5]}</td>
        <td>${registros[i][6]}</td>
        <td>${registros[i][7]}</td>
        <td>${registros[i][8]}</td>
        <td>${registros[i][10]} ${registros[i][11]}</td>
        <td>${registros[i][12]} ${registros[i][13]}</td>
        <td><i id="btnActualizar" onclick="actualizarRegistro(${i})" class='bx bxs-edit'></i></td>
        <td><i id="btnEliminar" onclick="eliminarRegistro(${i})" class='bx bxs-minus-circle'></i></td>
      </tr>
    `
  }
  bodyTabla.innerHTML = registrosHTML;
}
/* Funcion para guardar el registro */
const guardarRegistro = (registro) => {
  registros.push(registro);
  idRegistro++;
  actualizarTablaHTML(registros);
}

/* Funcion para eliminar los registros */
function eliminarRegistro(posRegistro) {
  if (registros.length <2) {
    registros.shift();
  } else{
    registros.splice(posRegistro,1);
  }
  actualizarTablaHTML(registros);
}

/* Funcion para actualizar el registro */
function actualizarRegistro (posRegistro){
  colocarDatosAct(posRegistro);
  btnActualizar.id = posRegistro;
}

/* Funcion para guardar el registro que se ha actualizado */
function guardarRegistroAct() {

  registros[btnActualizar.id][1] = placa.value;
  registros[btnActualizar.id][2] = marca.value;
  registros[btnActualizar.id][3] = modelo.value;
  registros[btnActualizar.id][4] = pasajeros.value;
  registros[btnActualizar.id][5] = color.value;
  registros[btnActualizar.id][6] = clase.value;
  registros[btnActualizar.id][7] = tipoDocumento.value;
  registros[btnActualizar.id][8] = numeroDocumento.value;
  registros[btnActualizar.id][9] = ciudades.value;
  registros[btnActualizar.id][10] = primerNombre.value;
  registros[btnActualizar.id][11] = segundoNombre.value;
  registros[btnActualizar.id][12] = primerApellido.value;
  registros[btnActualizar.id][13] = segundoApellido.value;

  btnRegistro.setAttribute('style','display:block');
  btnActualizar.setAttribute('style','display:none');
  placa.disabled = false;
  clase.disabled = false;

  actualizarTablaHTML(registros);
  setearValores();
}

/* Funcion para colocar los datos que se desean actualizar */
function colocarDatosAct(posRegistro) {
  placa.value = registros[posRegistro][1];
  marca.value = registros[posRegistro][2];
  modelo.value = registros[posRegistro][3];
  pasajeros.value = registros[posRegistro][4];
  color.value = registros[posRegistro][5];
  clase.value = registros[posRegistro][6];
  tipoDocumento.value = registros[posRegistro][7];
  numeroDocumento.value = registros[posRegistro][8];
  ciudades.value = registros[posRegistro][9];
  primerNombre.value = registros[posRegistro][10];
  segundoNombre.value = registros[posRegistro][11];
  primerApellido.value = registros[posRegistro][12];
  segundoApellido.value = registros[posRegistro][13];

  placa.disabled = true;
  clase.disabled = true;
  
  btnRegistro.setAttribute('style','display:none');
  btnActualizar.setAttribute('style','display:block');

  validarDocumento();
}

/* Funcion para validar que los datos sean llenados */
function validarDatos() {
  if (
    placa.value == '' ||
    marca.value == '' ||
    modelo.value == '' ||
    pasajeros.value == '' ||
    color.value == '' ||
    clase.value == '' ||
    tipoDocumento.value == '' ||
    numeroDocumento.value == '' ||
    ciudades.value == '' ||
    primerNombre.value == '' ||
    primerApellido.value == ''
  ){
    return true;
  }
}

/* Validad placa */
function validarClase() {
  if (clase.value == '') {
    alert("Por favor seleccione una clase de vehiculo")
  }
  if (clase.value == "Automovil") {
    placa.pattern="([A-Z]{3}[0-9]{3})";
  }
  if (clase.value == "Motocicleta") {
    placa.pattern="([A-Z]{3}[0-9]{2}[a-zA-Z]{1})";
  }
}
placa.addEventListener('blur',()=>{
  if (placa.value.length == 6 && clase.value == "Automovil") {
    placa.value = placa.value[0].toUpperCase() 
      + placa.value[1].toUpperCase() 
      + placa.value[2].toUpperCase() 
      + placa.value[3] 
      + placa.value[4] 
      + placa.value[5];
  } 
  if (placa.value.length == 6 && clase.value == "Motocicleta") {
    placa.value = placa.value[0].toUpperCase() 
      + placa.value[1].toUpperCase() 
      + placa.value[2].toUpperCase() 
      + placa.value[3] 
      + placa.value[4] 
      + placa.value[5].toUpperCase();
  } 
})

/* Validar Documento */
function validarDocumento() {
  if (tipoDocumento.value == "Pasaporte"){
    numeroDocumento.pattern = '[a-zA-Z]{2}[0-9]{6}';
    numeroDocumento.placeholder = "Eje: PE123456";
    numeroDocumento.maxLength = 8;
  }
  if (tipoDocumento.value == 'CC' || tipoDocumento.value == 'CE'){
    numeroDocumento.pattern = '[0-9]{1,10}';
    numeroDocumento.placeholder = "Eje: 1234567890";
    numeroDocumento.maxLength = 10;
  }
  return numeroDocumento.pattern;
}

/* Validar Placa */
function validarPlaca() {
  let contador = 0;
  for (let i = 0; i < registros.length; i++) {
    if (registros[i][1] == placa.value) {
      contador = 1;
    }
  }
  return contador;
}

/* Funcion para poner todos los labels en blanco despues de registrar o actualizar un registro */
function setearValores() {
  placa.value = '';
  marca.value = 'Acura';
  modelo.value = '2024';
  pasajeros.value = '2';
  color.value = 'Blanco';
  clase.value = '';
  tipoDocumento.value = 'CC';
  numeroDocumento.value = '';
  ciudades.value = 'Amazonas';
  primerNombre.value = '';
  segundoNombre.value = '';
  primerApellido.value = '';
  segundoApellido.value = '';
}


/* Incluir años al formulario */
var modelosOptionHTML = '';
for (let i = 2024; i > 1969; i--) {
  modelosOptionHTML += `
  <option value="${i}">${i}</option>
  `
}
modelo.innerHTML = modelosOptionHTML;

/* Condiciones segun la clase de vehiculo */
w.addEventListener('click', ()=> {
  /* Incluir options al formulario */
  
  /* MARCAS */
  let marcasAutos = [
    'Acura','Alfa Romeo','Audi','Baic','BAW','BMW','Brilliance','BYD','Cadillac','Changan',
    'Changhe','Chery','Chevrolet','Chrysler','Citroën','Daihatsu','DFSK','Dodge','Dongfeng',
    'DS','FAW','Ferrari','Fiat','Ford','Foton','Geely','GMC','Gonow','Great Wall','Haima',
    'Haval','Honda','Hummer','Hyundai','Infiniti','JAC','Jaguar','Jeep','Kenbo','Kia','Land Rover',
    'Lexus','Lifan','Mahindra','Maserati','Maxus','Mazda','Mercedes-Benz','MG','Mini','Mitsubishi',
    'Nissan','Opel','Peugeot','Porsche','RAM','Renault','SEAT','Skoda','Ssangyong','Subaru','Suzuki',
    'Toyota','UAZ','Volkswagen','Volvo','Wuling','Zhongxing','Zotye'
  ];
  let marcasMotos = [
    'AKT', 'Apollo Motors', 'Aprilia', 'Ayco', 'Bajaj', 'Benelli', 'BMW', 'CF Moto', 'Ducati',
    'Moto Guzzi Colombia', 'Harley Davidson', 'Hero Motos', 'Honda',  'Husqvarna', 'Jialing Motos',
    'Kawasaki', 'Keeway', 'Kymco', 'KTM', 'Lifan', 'Piaggio', 'Pulsar', 'Royal Enfield', 'Sherco',
    'Starker', 'Suzuki', 'SYM', 'Triumph', 'TVS', 'Vespa', 'Yamaha', 'YCF Riding'
  ]
  /* PASAJEROS */
  let pasajerosAutos = [2,3,4,5];
  /* COLORES */
  let coloresAutos = ['Blanco', 'Negro', 'Gris', 'Plata', 'Rojo ', 'Azul', 'Amarillo', 'Dorado', 'Beige', 'Café', 'Verde'];
  let coloresMotos = ['Negro', 'Negro Mate', 'Blanco', 'Rojo', 'Rojo Mate', 'Amarillo', 'Amarillo Mate', 'Azul', 'Azul Mate' , 'Naranja', 'Naranja Mate', 'Verde', 'Verde Mate'];
  
  /* Variables para agregar HTML */
  let marcasOptionHTML = '';
  let pasajerosOptionHTML ='';
  let coloresOptionHTML ='';
  
  /* Validar Clase y con esto asignar campos de formulario */
  if (clase.value == '') {
    marca.disabled = true;
    modelo.disabled = true;
    pasajeros.disabled = true;
    color.disabled = true;
  } else {
    marca.disabled = false;
    modelo.disabled = false;
    pasajeros.disabled = false;
    color.disabled = false;
  }
  if(clase.value == 'Automovil'){
    placa.placeholder = 'Eje: LMH397';
    for (let i = 0; i < coloresAutos.length; i++) {
      coloresOptionHTML += `
      <option value="${coloresAutos[i]}">${coloresAutos[i]}</option>
      `
    }
    for (let i = 0; i < pasajerosAutos.length; i++) {
      pasajerosOptionHTML += `
      <option value="${pasajerosAutos[i]}">${pasajerosAutos[i]}</option>
      `
    }
    for (let i = 0; i < marcasAutos.length; i++) {
      marcasOptionHTML += `
      <option value="${marcasAutos[i]}">${marcasAutos[i]}</option>
      `
    }
  }
  if(clase.value == 'Motocicleta'){
    placa.placeholder = 'Eje: LMH39Q';
    pasajeros.disabled = true;
    for (let i = 0; i < coloresMotos.length; i++) {
      coloresOptionHTML += `
      <option value="${coloresMotos[i]}">${coloresMotos[i]}</option>
      `
    }
    pasajerosOptionHTML += `
    <option value="2">2</option>
    `
    for (let i = 0; i < marcasMotos.length; i++) {
      marcasOptionHTML += `
        <option value="${marcasMotos[i]}">${marcasMotos[i]}</option>
      `
    }
  }
  
  marca.innerHTML = marcasOptionHTML;
  pasajeros.innerHTML = pasajerosOptionHTML;
  color.innerHTML = coloresOptionHTML;
  
  /* placeholder Tipo documentos */
  if (tipoDocumento.value == "Pasaporte"){
    numeroDocumento.placeholder = "Eje: PE123456";
  }
  if (tipoDocumento.value == 'CC' || tipoDocumento.value == 'CE'){
    numeroDocumento.placeholder = "Eje: 1234567890";
  }
  
})

window.addEventListener("keypress", function(event){
  if (event.keyCode == 13){
      event.preventDefault();
  }
}, false);