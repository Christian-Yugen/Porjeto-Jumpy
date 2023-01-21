const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const cpf = document.getElementById("cpf");
const password = document.getElementById("password");

//mascara para CPF
document.getElementById('cpf').addEventListener('input', function (e) {

  let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
  e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + (x[3] ? '.' : '') + x[3] + (x[4] ? '/' : x[4]) + x[4] + (x[5] ? '-' + x[5] : '');

  if (e.target.value.length < 15) {
    x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + (x[3] ? '.' : '') + x[3] + (x[4] ? '-' + x[4] : '');
  }

  console.log('Com formatação: ' + e.target.value);

  //Função para remover todos os caracteres menos os números em Javascript
  let valor = e.target.value.replace(/[^0-9]/g, '');
  console.log('Sem formatação: ' + valor);
});

//Mascara para o telefone.
function mascara(o, f) {
 v_obj = o
 v_fun = f
  setTimeout("execmascara()", 1)
}
function execmascara() {
  v_obj.value = v_fun(v_obj.value)
}
function mtel(v) {
  v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
  v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
  return v;
}
function id(el) {
  return document.getElementById(el);
}
window.onload = function () {
  id('telefone').onkeyup = function () {
    mascara(this, mtel);
  }
}//fim da mascara.

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const telefoneValue = telefone.value;
  const cpfValue = cpf.value;
  const passwordValue = password.value;

  if (usernameValue === "") {
    setErrorFor(username, '"Campo Obrigatório"');
  } else if (usernameValue.length < 10) {
    setErrorFor(username, '"Digite seu nome completo"');
  }else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, '"Campo Obrigatório"');
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (telefoneValue === "") {
    setErrorFor(telefone, '"Campo Obrigatório"');
  } else if (telefoneValue.length < 15) {
    setErrorFor(telefone, '"Telefone invalido."');
  } else {
    setSuccessFor(telefone);
  }

  if (cpfValue === "") {
    setErrorFor(cpf, '"Campo Obrigatório"');
  } else if (cpfValue.length < 14) {
    setErrorFor(cpf, '"CPF inválido."');
  } else {
    setSuccessFor(cpf);
  }

  if (passwordValue === "") {
    setErrorFor(password, '"Campo Obrigatório"');
  } else if (passwordValue.length < 6) {
    setErrorFor(password, '"Mínimo 6 caracteres."');
  } else {
    setSuccessFor(password);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return (formControl.className === "form-control success");
  });
  if (formIsValid) {
    alert("Parabéns seu cadastro foi realizado com Sucesso!")
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}