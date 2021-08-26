"use strict";
const cep = document.getElementById("cep");

const eNumero = (num) => /^[0-9]+$/.test(num);
const cepvalido = (cep) => cep.length ===8 && eNumero(cep); 

const pesquisarCep = async() => { 
  limparFormulario();
  let cep = document.getElementById("cep");
  cep = cep.value; 
  const url = `http://viacep.com.br/ws/${cep}/json/`;

  if (cepvalido(cep)){
  const dados = await fetch(url) 
  const endereco = await dados.json() 
  
  if (endereco.hasOwnProperty('erro')){  
    document.getElementById('endereço').value = 'CEP não encontrado';
  } else {
    preencherFormulario(endereco);
  }
}else {
  document.getElementById('endereço').value = 'CEP não encontrado';
}};


const limparFormulario = () => {
  document.getElementById('endereço').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) => {
  document.getElementById('endereço').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}


cep.addEventListener("focusout", pesquisarCep);
