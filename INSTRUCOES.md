# Landing Pages - Evento Elas

## Estrutura

```
landing-pages-elas/
├── bs.html          # Balneario Shopping (31/03)
├── nk.html          # Neumarkt Shopping (01/04)
├── gs.html          # Garten Shopping (08-09/04)
├── css/style.css    # Estilos compartilhados
├── js/form.js       # Logica do formulario
├── google-apps-script.js  # Script para Google Sheets
└── img/             # Colocar KVs aqui
```

## Setup Rapido (15 min)

### 1. Google Sheets (receber dados)

1. Crie uma Google Sheet nova
2. Na linha 1, coloque os headers:
   `Data/Hora | Shopping | Evento | Nome | Telefone | Email | Lojista | Tipo Loja | Tempo Investimento | Faixa Investimento`
3. Va em **Extensoes > Apps Script**
4. Cole o conteudo de `google-apps-script.js`
5. Clique **Implantar > Nova implantacao**
6. Tipo: **App da Web**
7. Executar como: **Eu**
8. Quem tem acesso: **Qualquer pessoa**
9. Copie a URL gerada

### 2. Configurar o formulario

1. Abra `js/form.js`
2. Na linha 7, substitua `COLE_AQUI_A_URL_DO_GOOGLE_APPS_SCRIPT` pela URL copiada

### 3. Adicionar KVs (imagens do evento)

1. Coloque as imagens na pasta `img/` (ex: `kv-bs.jpg`, `kv-nk.jpg`, `kv-gs.jpg`)
2. Em cada HTML, descomente a linha `<img src="img/kv-bs.jpg" ...>` no header

### 4. Deploy (GitHub Pages)

```bash
# Criar repo no GitHub
gh repo create landing-elas --public --source=. --push

# Ativar GitHub Pages: Settings > Pages > Source: main > Save
# URLs ficam: https://carlosgravi.github.io/landing-elas/bs.html
```

### 5. Gerar QR Codes

Use qualquer gerador de QR code para as URLs:
- BS: `https://SEU-DOMINIO/bs.html`
- NK: `https://SEU-DOMINIO/nk.html`
- GS: `https://SEU-DOMINIO/gs.html`

## Cores por Shopping

- **BS** (Balneario): Rosa/coral (`theme-bs`)
- **NK** (Neumarkt): Roxo/lavanda (`theme-nk`)
- **GS** (Garten): Teal/verde-azulado (`theme-gs`)

## Cronograma

| Shopping | Evento | Data |
|----------|--------|------|
| Balneario Shopping | Elas Talk | 31/03 |
| Neumarkt Shopping | Elas Talk | 01/04 |
| Garten Shopping | GS Trends (Talk + Desfile) | 08 e 09/04 |
