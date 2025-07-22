// script.js
import { validarCampo } from './validarCampo.js';
import { fetchMarcas, fetchModelos, fetchAnos } from './fetchFipe.js';

document.addEventListener('DOMContentLoaded', function () {
    const nome = document.getElementById('nome');
    const celular = document.getElementById('celular');
    const placa = document.getElementById('placa');
    const preferenciaSelect = document.getElementById('preferencia');
    const proximo = document.getElementById('proximo');
    const passo1 = document.getElementById('passo1');
    const passo2 = document.getElementById('passo2');
    const voltar = document.getElementById('voltar');
    const form = document.getElementById('meuFormulario');
    const tipoVeiculoSelect = document.getElementById("tipoVeiculo");
    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const anoSelect = document.getElementById("ano");
    const submitButton = form.querySelector('.botao-proximo');
    const loadingSpinner = form.querySelector('.loading-spinner');

    let nomeValido = false;
    let celularValido = false;

    window.addEventListener('resize', () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    });

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

        submitButton.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        submitButton.disabled = true;

        const tipoVeiculo = tipoVeiculoSelect.value;
        const marcaText = marcaSelect.options[marcaSelect.selectedIndex]?.text || "";
        const modeloText = modeloSelect.options[modeloSelect.selectedIndex]?.text || "";
        const anoText = anoSelect.options[anoSelect.selectedIndex]?.text || "";
        const placaValue = placa.value;
        const preferenciaValue = preferenciaSelect.value;

        const dados = new URLSearchParams();
        dados.append("nome", nome.value);
        dados.append("celular", celular.value);
        dados.append("placa", placaValue);
        dados.append("tipoVeiculo", tipoVeiculo);
        dados.append("marca", marcaText);
        dados.append("modelo", modeloText);
        dados.append("ano", anoText);
        dados.append("preferencia", preferenciaValue);

        fetch('https://script.google.com/macros/s/AKfycbwRgytGB4U3ldoppcRO3QrbanRsifmRlr29RLV2UwFdzEGv5oHcOlFDyEftpCq_gI4X/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: dados.toString()
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'sucesso.html';
            } else {
                throw new Error('Erro ao enviar os dados.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar os dados.');
        })
        .finally(() => {
            submitButton.style.display = 'block';
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;
        });
    });

    tipoVeiculoSelect.addEventListener("change", () => {
        const tipoVeiculo = tipoVeiculoSelect.value;
        // Clear dependent selects before fetching new data
        marcaSelect.innerHTML = '<option value="">Selecione a marca</option>';
        modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
        anoSelect.innerHTML = '<option value="">Selecione o ano</option>';

        if (tipoVeiculo) {
            fetchMarcas(tipoVeiculo, marcaSelect);
        }
    });

    marcaSelect.addEventListener("change", () => {
        const tipoVeiculo = tipoVeiculoSelect.value;
        const marcaId = marcaSelect.value;
        // Clear dependent selects before fetching new data
        modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
        anoSelect.innerHTML = '<option value="">Selecione o ano</option>';

        if (marcaId) {
            fetchModelos(tipoVeiculo, marcaId, modeloSelect);
        }
    });

    modeloSelect.addEventListener("change", () => {
        const tipoVeiculo = tipoVeiculoSelect.value;
        const marcaId = marcaSelect.value;
        const modeloId = modeloSelect.value;
        // Clear dependent select before fetching new data
        anoSelect.innerHTML = '<option value="">Selecione o ano</option>';

        if (marcaId && modeloId) {
            fetchAnos(tipoVeiculo, marcaId, modeloId, anoSelect);
        }
    });
});