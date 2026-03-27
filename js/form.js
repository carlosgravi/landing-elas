/**
 * Landing Page - Evento Elas
 * Form handling + Google Sheets integration
 */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby6JRXnixJ0qQ_IupSKWHWYQDT-1RgkIZVxnLluf52mlrA_p6hnwcyLVFs9JUCenPB-/exec';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    const btnSubmit = form.querySelector('.btn-submit');
    const formCard = document.querySelector('.form-card');
    const successScreen = document.querySelector('.success-screen');

    // Máscara de telefone
    const telInput = document.getElementById('telefone');
    telInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 6) {
            v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
        } else if (v.length > 2) {
            v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        } else if (v.length > 0) {
            v = `(${v}`;
        }
        e.target.value = v;
    });

    // Validação
    function validar() {
        let valido = true;
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        const nome = document.getElementById('nome');
        if (!nome.value.trim() || nome.value.trim().length < 3) {
            nome.closest('.form-group').classList.add('error');
            valido = false;
        }

        const tel = telInput.value.replace(/\D/g, '');
        if (tel.length < 10) {
            telInput.closest('.form-group').classList.add('error');
            valido = false;
        }

        const email = document.getElementById('email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            email.closest('.form-group').classList.add('error');
            valido = false;
        }

        return valido;
    }

    // Coletar dados
    function coletarDados() {
        return {
            nome: document.getElementById('nome').value.trim(),
            telefone: telInput.value.trim(),
            email: document.getElementById('email').value.trim(),
            shopping: form.dataset.shopping || '',
            evento: form.dataset.evento || '',
            data_registro: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        };
    }

    // Enviar
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validar()) {
            const firstError = form.querySelector('.form-group.error');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.classList.add('loading');

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(coletarDados())
            });

            formCard.classList.add('hidden');
            const promoBanner = document.querySelector('.promo-banner');
            if (promoBanner) promoBanner.classList.add('hidden');
            const goldDivider = document.querySelector('.gold-divider');
            if (goldDivider) goldDivider.classList.add('hidden');
            successScreen.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            alert('Erro ao enviar. Tente novamente.');
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.classList.remove('loading');
        }
    });

    // Remover erro ao interagir
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => input.closest('.form-group').classList.remove('error'));
    });
});
