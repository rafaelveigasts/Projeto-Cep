"use strict";
const cep = document.getElementById("cep");


const pesquisarCep = async() => { // declarar que é uma função assíncrona
  let cep = document.getElementById("cep");
  cep = cep.value; // o atributo value é o que ta digitado na caixinha
  const url = `http://viacep.com.br/ws/${cep}/json/`; //como o cep é dinâmico colocamos a variável dinâmica
  // fetch(url).then(response => response.json().then(console.log)) 
  /*fetch retorna uma promessa (response), coisa que pode ou não acontecer, ou seja, um retorno assíncrono. 
  O json também volta uma promessa, então temos que usar outro then nele. Faça um console.log dentro do then final para ver o resultado*/
  const dados = await fetch(url) // pega os dados do fetch, com o await ele já me traz o retorno do response, sem ficar pendente
  const endereco = await dados.json() // aplica o método json, await no json pq json também é uma promessa
  
  if (endereco.hasOwnProperty('erro')){  // caso o cep não seja encontrado, colcoar um cep errado e ver no console.log
    document.getElementById('endereço').value = 'CEP não encontrado';
  } else {
    preencherFormulario(endereco);
  }
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/HasOwnProperty
};

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