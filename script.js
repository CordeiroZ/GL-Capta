document.addEventListener('DOMContentLoaded', function () {
    const nome = document.getElementById('nome');
    const celular = document.getElementById('celular');
    const placa = document.getElementById('placa');
    const proximo = document.getElementById('proximo');
    const passo1 = document.getElementById('passo1');
    const passo2 = document.getElementById('passo2');
    const voltar = document.getElementById('voltar');
    const form = document.getElementById('meuFormulario');
    const tipoVeiculoSelect = document.getElementById("tipoVeiculo");
    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const anoSelect = document.getElementById("ano");
    const submitButton = form.querySelector('.botao-proximo'); // Get the submit button
    const loadingSpinner = form.querySelector('.loading-spinner'); // Get the loading spinner

    let nomeValido = false;
    let celularValido = false;

    function validarCampo(input, regex) {
        if (!regex.test(input.value)) {
            input.style.border = '2px solid red';
            return false;
        } else {
            input.style.border = '1px solid #ccc';
            return true;
        }
    }

    nome.addEventListener('input', function () {
        nomeValido = validarCampo(nome, /^[A-Za-záàãâäéèêëíìîïóòôõöúùûüç ]+$/);
    });

    celular.addEventListener('input', function () {
        celularValido = validarCampo(celular, /^\(?[0-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/);
    });

    proximo.addEventListener('click', function () {
        if (nomeValido && celularValido) {
            passo1.style.display = 'none';
            passo2.style.display = 'block';
        } else {
            alert('Por favor, preencha corretamente os campos Nome e Celular.');
        }
    });

    voltar.addEventListener('click', function () {
        passo2.style.display = 'none';
        passo1.style.display = 'block';
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Show loading spinner and disable the button
        submitButton.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        submitButton.disabled = true;

        const tipoVeiculo = tipoVeiculoSelect.value;
        const marcaText = marcaSelect.options[marcaSelect.selectedIndex]?.text || "";
        const modeloText = modeloSelect.options[modeloSelect.selectedIndex]?.text || "";
        const anoText = anoSelect.options[anoSelect.selectedIndex]?.text || "";
        const placaValue = placa.value;

        const dados = new URLSearchParams();
        dados.append("nome", nome.value);
        dados.append("celular", celular.value);
        dados.append("placa", placaValue);
        dados.append("tipoVeiculo", tipoVeiculo);
        dados.append("marca", marcaText);
        dados.append("modelo", modeloText);
        dados.append("ano", anoText);

        fetch('https://script.google.com/macros/s/AKfycbxaWiBu1nYinv-dRD7Q9V4w57O9HCdVl_hKHOK-N7JugapYXe29WRnZxS1-9VwZHguJ/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: dados.toString()
        })
        .then(response => {
            if (response.ok) {
                alert('Dados enviados com sucesso!');
                form.reset();
                passo2.style.display = 'none';
                passo1.style.display = 'block';
            } else {
                throw new Error('Erro ao enviar os dados.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar os dados.');
        })
        .finally(() => {
            // Hide loading spinner and re-enable the button, regardless of success or failure
            submitButton.style.display = 'block';
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;
        });
    });

    tipoVeiculoSelect.addEventListener("change", () => {
        const tipoVeiculo = tipoVeiculoSelect.value;
        marcaSelect.innerHTML = '<option value="">Selecione a marca</option>';
        modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
        anoSelect.innerHTML = '<option value="">Selecione o ano</option>';

        if (tipoVeiculo) {
            fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`)
                .then((response) => response.json())
                .then((marcas) => {
                    marcas.forEach((marca) => {
                        const option = document.createElement("option");
                        option.value = marca.codigo;
                        option.textContent = marca.nome;
                        marcaSelect.appendChild(option);
                    });
                })
                .catch((error) => {
                    console.error("Erro ao buscar marcas:", error);
                    alert(`Erro ao buscar marcas: ${error.message}`);
                });
        }
    });

    marcaSelect.addEventListener("change", () => {
        const tipoVeiculo = tipoVeiculoSelect.value;
        const marcaId = marcaSelect.value;
        modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
        anoSelect.innerHTML = '<option value="">Selecione o ano</option>';

        if (marcaId) {
            fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marcaId}/modelos`)
                .then((response) => response.json())
                .then((modelos) => {
                    modelos.modelos.forEach((modelo) => {
                        const option = document.createElement("option");
                        option.value = modelo.codigo;
                        option.textContent = modelo.nome;
                        modeloSelect.appendChild(option);
                    });
                })
                .catch((error) => {
                    console.error("Erro ao buscar modelos:", error);
                    alert(`Erro ao buscar modelos: ${error.message}`);
                });
        }
    });

    modeloSelect.addEventListener("change", () => {
        const tipoVeiculo = tipoVeiculoSelect.value;
        const marcaId = marcaSelect.value;
        const modeloId = modeloSelect.value;
        anoSelect.innerHTML = '<option value="">Selecione o ano</option>';

        if (marcaId && modeloId) {
            fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marcaId}/modelos/${modeloId}/anos`)
                .then((response) => response.json())
                .then((anos) => {
                    anos.forEach((ano) => {
                        const option = document.createElement("option");
                        option.value = ano.codigo;
                        option.textContent = ano.nome;
                        anoSelect.appendChild(option);
                    });
                })
                .catch((error) => {
                    console.error("Erro ao buscar anos:", error);
                    alert(`Erro ao buscar anos: ${error.message}`);
                });
        }
    });
});


/* -----------------------------------------------------------------------------------------------------------------
----------------------------------------Planilha--------------------------------------------------------------------
// function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var id = getNextId(sheet);
  var nome = validarCampo(e.parameter.nome);
  var celular = validarCampo(e.parameter.celular);
  var placa = validarCampo(e.parameter.placa);
  var tipoVeiculo = validarCampo(e.parameter.tipoVeiculo);
  var marca = validarCampo(e.parameter.marca);
  var modelo = validarCampo(e.parameter.modelo);
  var ano = validarCampo(e.parameter.ano);

  // Adiciona os dados na planilha
  sheet.appendRow([id, nome, celular, placa, tipoVeiculo, marca, modelo, ano]);

  return ContentService.createTextOutput("Dados recebidos com sucesso!");
}

// Função auxiliar para gerar o próximo ID
function getNextId(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    return 1;
  } else {
    var lastId = sheet.getRange(lastRow, 1).getValue();
    return parseInt(lastId) + 1;
  }
}

// Substitui campo vazio ou undefined por "-"
function validarCampo(campo) {
  return campo && campo.trim() !== "" ? campo.trim() : "-";
}

*/ 

