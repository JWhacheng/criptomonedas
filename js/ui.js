class Interfaz {
  constructor() {
    this.init();
  }
  init() {
    this.construirSelect();
  }

  construirSelect() {
    cotizador.obtenerMonedasAPI().then((monedas) => {
      // Crear un select de opciones
      const select = document.querySelector('#criptomoneda');

      // Iterar por los resultados de la API
      for (const [key, value] of Object.entries(monedas.monedas.Data)) {
        // Agregar el Symbol y el Nombre como opciones
        const opcion = document.createElement('option');
        opcion.value = value.Symbol;
        opcion.appendChild(document.createTextNode(value.CoinName));
        select.appendChild(opcion);
      }
    });
  }

  mostrarMensaje(mensaje, clases) {
    const div = document.createElement('div');
    div.className = clases;
    div.appendChild(document.createTextNode(mensaje));

    // Seleccionar mensajes, mostrar contenido
    const divMensaje = document.querySelector('.mensajes');
    divMensaje.appendChild(div);

    // Mostrar contenido
    setTimeout(() => {
      document.querySelector('.mensajes div').remove();
    }, 3000);
  }

  // Imprime el resultado de la cotizacion
  mostrarResultado(resultado, moneda, criptomoneda) {

    // En caso de un resultado anterior, ocultarlo
    const resultadoAnterior = document.querySelector('#resultado > div');
    if (resultadoAnterior) {
      resultadoAnterior.remove();
    }

    const datosMoneda = resultado[criptomoneda][moneda];

    // Recortar digitos de precio, porcentaje
    let precio = datosMoneda.PRICE.toFixed(2),
        porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
        actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');

    // Construir el template
    let templateHTML = `
      <div class="card bg-warning">
        <div class="card-body text-light">
          <h2 class="card-title">Resultado:</h2>
          <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: ${precio}</p>
          <p>Variacion ultimo dia: % ${porcentaje}</p>
          <p>Ultima actualizacion: ${actualizado}</p>
        </div>
      </div>
    `;

    this.mostrarOcultarSpinner('block');

    setTimeout(() => {
      // Insertar el resultado
      document.querySelector('#resultado').innerHTML = templateHTML;

      // Ocultar el spinner
      this.mostrarOcultarSpinner('none');

    }, 3000);
  }

  // Mostrar o ocultar el spinner de carga al enviar la cotizacion
  mostrarOcultarSpinner(vista) {
    const spinner = document.querySelector('.contenido-spinner');
    spinner.style.display = vista;
  }
}
