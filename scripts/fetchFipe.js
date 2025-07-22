// fetchFipe.js
export function fetchMarcas(tipoVeiculo, marcaSelect) {
    fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`)
        .then((response) => response.json())
        .then((marcas) => {
            marcaSelect.innerHTML = '<option value="">Selecione a marca</option>'; // Clear existing options
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

export function fetchModelos(tipoVeiculo, marcaId, modeloSelect) {
    fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marcaId}/modelos`)
        .then((response) => response.json())
        .then((data) => { // 'data' instead of 'modelos' because the API returns an object with a 'modelos' key
            modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>'; // Clear existing options
            data.modelos.forEach((modelo) => {
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

export function fetchAnos(tipoVeiculo, marcaId, modeloId, anoSelect) {
    fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marcaId}/modelos/${modeloId}/anos`)
        .then((response) => response.json())
        .then((anos) => {
            anoSelect.innerHTML = '<option value="">Selecione o ano</option>'; // Clear existing options
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