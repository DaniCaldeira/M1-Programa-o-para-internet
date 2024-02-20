const form = document.getElementById('formLogin');

function validar(e) {
    if (form.checkVisibility() === false) {
        form.classList.add('was-validated');
        e.preventDfault();
        e.stopPropagation();
    } else {
        form.classList.remove('was-validated');
        window.location.href = 'eventos.html'; // Redireciona para a página eventos.html após o envio do formulário
    }
}

form.addEventListener('submit', validar);