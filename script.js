"use strict";
const cep = document.getElementById("cep");
const eNumero = (num) => /^[0-9]+$/.test;

const cepvalido = (cep) => cep.length ===8 && eNumero(cep); 
/* dentro das expressões regulares o ^significa o início e o & o fim, ou seja, 
tem que iniciar com número e terminar com número o + representa 1 ou + caracteres. 
No geral: 8 caracteres numéricos de 0-9.
O .test(cep) verifica no cep se todos os 8 dígitos são números do início ao fim
*/

const pesquisarCep = async() => { // declarar que é uma função assíncrona
  let cep = document.getElementById("cep");
  cep = cep.value; // o atributo value é o que ta digitado na caixinha
  const url = `http://viacep.com.br/ws/${cep}/json/`; //como o cep é dinâmico colocamos a variável dinâmica
  // fetch(url).then(response => response.json().then(console.log)) 
  /*fetch retorna uma promessa (response), coisa que pode ou não acontecer, ou seja, um retorno assíncrono. 
  O json também volta uma promessa, então temos que usar outro then nele. Faça um console.log dentro do then final para ver o resultado*/

  /* enviar ao fetch somente cep's validos, nada de letras*/
  if (cepvalido(cep)){
  const dados = await fetch(url) // pega os dados do fetch, com o await ele já me traz o retorno do response, sem ficar pendente
  const endereco = await dados.json() // aplica o método json, await no json pq json também é uma promessa
  
  if (endereco.hasOwnProperty('erro')){  // caso o cep não seja encontrado, colcoar um cep errado e ver no console.log
    document.getElementById('endereço').value = 'CEP não encontrado';
  } else {
    preencherFormulario(endereco);
  }
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/HasOwnProperty
}else {
  document.getElementById('endereço').value = 'CEP não encontrado';
}};

const preencherFormulario = (endereco) => {
  document.getElementById('endereço').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}
/* Se atentar no padrão json que o site viacep fornece para
colcoar as propriedades certas */


cep.addEventListener("focusout", pesquisarCep);

// https://developer.mozilla.org/pt-BR/docs/Web/API/Element/focusout_event
// https://viacep.com.br/