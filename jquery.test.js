import '@testing-library/jest-dom/extend-expect';
const $ = require('jquery');
import Timeout from 'await-timeout';

beforeAll(() => {
  // Set up our document body
  document.body.innerHTML = `
  <div class="container">
    <h2>Bienvenido al curso de jQuery</h2>

    <form name="listaCompras">
      <input type="text" name="itemCompras" />
    </form>

    <div id="button">Añadir ítem</div>
    <ol></ol>
  </div>
    `;
  require('./index');
});

it('index.js agrega un nuevo item a la ol al presionar el div id="button" | Asegúrate de que al presionar el div id="Button" se agregue un nuevo item a la ol con el valor del input', () => {
  $('input[type="text"]').val('1');

  $('#button').click();

  expect($('li:last-child').text()).toBe('1');

  $('input[type="text"]').val('2');

  $('#button').click();

  expect($('li:last-child').text()).toBe('2');
});

it('index.js limpia el valor del input al hacer click | Asegúrate de que al presionar el div id="Button" se limpie el valor del input', () => {
  $('input[type="text"]').val('3');

  $('#button').click();

  expect($('input[type="text"]').val()).toBe('');
});

it('index.js al presionar la tecla enter se genera el evento click del div id="button" | Asegúrate de que al presionar la tecla enter se genera el evento click del div id="button"', () => {
  $('input[type="text"]').val('4');

  let e = $.Event('keyup');
  e.keyCode = 13;
  $('input[type="text"]').trigger(e);

  expect($('li:last-child').text()).toBe('4');

  expect($('input[type="text"]').val()).toBe('');
});

it('index.js al hacer submit la form ejecuta preventDefault | Asegúrate de que al hacerle submit al form se ejectute el preventDefault', () => {
  const mock = jest.spyOn(console, 'error').mockImplementation(() => {});
  let e = $.Event('submit');
  Object.assign(e, { preventDefault: jest.fn() });

  $('form').trigger(e);

  expect(e.preventDefault).toBeCalled();
});

it('index.js al dar doble click en un li se asigna la clase "strike" y 500ms despues se elimina el elemento | Asegúrate que al dar doble click en un li se asigna la clase "strike" y 500ms despues se elimine el elemento', async () => {
  let dbl = $.Event('dblclick');
  let e = $.Event('keyup');

  $('input[type="text"]').val('a eliminar');

  e.keyCode = 13;
  $('input[type="text"]').trigger(e);

  let lastLi = $('li:last-child');

  expect(lastLi.hasClass('strike')).toBe(false);

  const children = $('ol').children().length;

  lastLi.trigger(dbl);

  await Timeout.set(500);

  expect(lastLi.hasClass('strike')).toBe(true);

  await Timeout.set(500);

  expect($('ol').children().length).toBe(children - 1);
  expect($('li:last-child').text()).not.toBe('a eliminar');
});

it('index.js al presionar el div id="button" se guarda el valor del input en la variable global window.listaCompras y en el almacenamiento local | Asegúrate que al presionar el div id="button" se guarde el valor del input en la variable global window.listaCompras y en el almacenamiento local bajo la llave "listaCompras"', () => {
  $('input[type="text"]').val('5');

  let e = $.Event('keyup');
  e.keyCode = 13;
  $('input[type="text"]').trigger(e);

  expect(window.listaCompras.includes('5')).toBe(true);
  expect(window.localStorage.getItem('listaCompras').includes('5')).toBe(true);
});
