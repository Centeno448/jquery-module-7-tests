import $ from 'jquery';

window.listaCompras = [];

$('#button').click(function () {
  var toAdd = $('input[name=itemCompras]').val();
  $('ol').append('<li>' + toAdd + '</li>');
  $('input').val('');
  window.listaCompras.push(toAdd);
  localStorage.setItem('listaCompras', JSON.stringify(window.listaCompras));
});

$('input[name=itemCompras]').keyup(function (event) {
  if (event.keyCode == 13) {
    $('#button').click();
  }
});

$('form').on('submit', function (e) {
  e.preventDefault();
});

$(document).on('dblclick', 'li', function () {
  $(this)
    .toggleClass('strike')
    .fadeOut(500, function () {
      $(this).remove();
    });
});
