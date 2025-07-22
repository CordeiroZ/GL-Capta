// validarCampo.js s
export function validarCampo(input, regex) {
    if (!regex.test(input.value)) {
        input.style.border = '2px solid red';
        return false;
    } else {
        input.style.border = '1px solid #ccc';
        return true;
    }
}