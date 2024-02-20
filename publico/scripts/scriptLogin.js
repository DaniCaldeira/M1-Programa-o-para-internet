const form = document.getElementById('formLogin');

function validar(e) {
    if (form.checkVisibility() === false) {
        form.classList.add('was-validated');
        e.preventDfault();
        e.stopPropagation();
    } else {
        form.classList.remove('was-validated');
    }
}

form.addEventListener('submit', validar);