"use strict";
const cep = document.getElementById("cep");

const pesquisarCep = () => {
  let cep = document.getElementById("cep");
  cep = cep.value; // o atributo value é o que ta digitado na caixinha
  const url = `https://viacep.com.br/ws/${cep}/json/`; //como o cep é dinâmico colocamos a variável dinâmica
  fetch(url).then(response => response.json().then(console.log)) 
  /*fetch retorna uma promessa (response), coisa que pode ou não acontecer, ou seja, um retorno assíncrono. 
  O json também volta uma promessa, então temos que usar outro then nele. Faça um console.log dentro do then final para ver o resultado*/
};

cep.addEventListener("focusout", pesquisarCep);
// https://developer.mozilla.org/pt-BR/docs/Web/API/Element/focusout_event
