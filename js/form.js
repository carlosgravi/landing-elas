/**
 * Landing Page - Evento Elas
 * Form handling + Google Sheets integration
 */

// ==============================================================
// CONFIGURACAO: Substitua pela URL do Google Apps Script
// ==============================================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby6JRXnixJ0qQ_IupSKWHWYQDT-1RgkIZVxnLluf52mlrA_p6hnwcyLVFs9JUCenPB-/exec';
// ==============================================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    const btnSubmit = form.querySelector('.btn-submit');
    const formCard = document.querySelector('.form-card');
    const successScreen = document.querySelector('.success-screen');

    // Mascara de telefone
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

    // Validacao
    function validar() {
        let valido = true;
        // Limpar erros
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        // Nome
        const nome = document.getElementById('nome');
        if (!nome.value.trim() || nome.value.trim().length < 3) {
            nome.closest('.form-group').classList.add('error');
            valido = false;
        }

        // Telefone
        const tel = telInput.value.replace(/\D/g, '');
        if (tel.length < 10) {
            telInput.closest('.form-group').classList.add('error');
            valido = false;
        }

        // Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.closest('.form-group').classList.add('error');
            valido = false;
        }

        // Radios obrigatorios
        const radiosObrigatorios = ['lojista', 'loja_tipo', 'tempo_investimento', 'faixa_investimento'];
        radiosObrigatorios.forEach(name => {
            const checked = form.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                const group = form.querySelector(`input[name="${name}"]`).closest('.form-group');
                group.classList.add('error');
                valido = false;
            }
        });

        return valido;
    }

    // Coletar dados
    function coletarDados() {
        const getRadio = (name) => {
            const el = form.querySelector(`input[name="${name}"]:checked`);
            return el ? el.value : '';
        };

        return {
            nome: document.getElementById('nome').value.trim(),
            telefone: telInput.value.trim(),
            email: document.getElementById('email').value.trim(),
            lojista: getRadio('lojista'),
            loja_tipo: getRadio('loja_tipo'),
            tempo_investimento: getRadio('tempo_investimento'),
            faixa_investimento: getRadio('faixa_investimento'),
            shopping: document.getElementById('leadForm').dataset.shopping || '',
            evento: document.getElementById('leadForm').dataset.evento || '',
            data_registro: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        };
    }

    // Enviar
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validar()) {
            // Scroll pro primeiro erro
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const dados = coletarDados();

        btnSubmit.disabled = true;
        btnSubmit.classList.add('loading');

        try {
            if (GOOGLE_SCRIPT_URL !== 'COLE_AQUI_A_URL_DO_GOOGLE_APPS_SCRIPT') {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });
            } else {
                // Modo dev: simula envio
                console.log('Dados do formulario:', dados);
                await new Promise(r => setTimeout(r, 1000));
            }

            // Sucesso
            formCard.classList.add('hidden');
            successScreen.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
            console.error('Erro ao enviar:', err);
            alert('Erro ao enviar. Tente novamente.');
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.classList.remove('loading');
        }
    });

    // Remover erro ao interagir
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            input.closest('.form-group').classList.remove('error');
        });
        input.addEventListener('change', () => {
            input.closest('.form-group').classList.remove('error');
        });
    });
});
