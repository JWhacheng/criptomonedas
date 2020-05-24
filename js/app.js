const cotizador = new API(
  '74a5a5ca2b8f364e3d3f34324f401f3ab5918b7712b19bd92f4dc8e40e4a9be5'
);
const ui = new Interfaz();

// Leer el formulario
const formulario = document.querySelector('#formulario');
// EventListener
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  // Leer la moneda seleccionada
  const monedaSelect = document.querySelector('#moneda');
  const monedaSeleccionada =
    monedaSelect.options[monedaSelect.selectedIndex].value;

  // Leer la criptomoneda seleccionada
  const criptoMonedaSelect = document.querySelector('#criptomoneda');
  const criptoMonedaSeleccionada =
    criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

  // Comprobar que ambos campos tengan algo seleccionado
  if (monedaSeleccionada === '' || criptoMonedaSeleccionada == '') {
    // Arrojar una alerta de error
    ui.mostrarMensaje(
      'Ambos campos son obligatorios',
      'alert alert-danger text-center'
    );
  } else {
    // Todo bien, consultar la API
    cotizador
      .obetnerValores(monedaSeleccionada, criptoMonedaSeleccionada)
      .then((data) => {
        ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
      });
  }
});
