# GL Soluções - Captação de Lead para Proteção Veicular

Este projeto é uma **página de captação de leads** para proteção veicular, permitindo ao usuário realizar uma cotação **sem sair de casa**, preenchendo um formulário dinâmico e integrado ao Google Sheets via Google Apps Script.

## Funcionalidades

✅ **Formulário em dois passos:**
- Passo 1: Nome, Celular, Placa.
- Passo 2: Tipo de veículo, marca, modelo e ano (busca automática via API FIPE).

✅ **Validação de campos em tempo real** com regex para evitar dados inválidos.

✅ **Integração com Google Sheets:**
- Envia dados do formulário via `fetch` para um endpoint do Google Apps Script.

✅ **Redirecionamento para página de sucesso** após o envio.

✅ **Design responsivo** e otimizado para mobile.

✅ **Carrossel de logos** de parceiros (seguradoras e associações).

✅ **Sessão de benefícios** com ícones explicativos.

✅ **Sessão de depoimentos reais de clientes.**

## Tecnologias utilizadas

- **HTML5**
- **CSS3** (`styles.css`, `carrosel.css`)
- **JavaScript (Vanilla)**
- **API FIPE (Parallelum)**
- **Google Apps Script (via Webhook)**
- **Fonte Google Fonts (Montserrat, Roboto)**