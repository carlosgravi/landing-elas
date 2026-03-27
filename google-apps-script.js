/**
 * Google Apps Script - Receber dados da Landing Page Elas
 *
 * SETUP:
 * 1. Crie uma Google Sheet com os headers abaixo na primeira linha
 * 2. Va em Extensoes > Apps Script
 * 3. Cole este codigo
 * 4. Clique em Implantar > Nova implantacao
 * 5. Tipo: App da Web
 * 6. Executar como: Eu
 * 7. Quem tem acesso: Qualquer pessoa
 * 8. Copie a URL gerada e cole no form.js (variavel GOOGLE_SCRIPT_URL)
 *
 * Headers da planilha (linha 1):
 * Data/Hora | Shopping | Evento | Nome | Telefone | Email | Lojista | Tipo Loja | Tempo Investimento | Faixa Investimento
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.data_registro || new Date().toLocaleString('pt-BR'),
      data.shopping || '',
      data.evento || '',
      data.nome || '',
      data.telefone || '',
      data.email || '',
      data.lojista || '',
      data.loja_tipo || '',
      data.tempo_investimento || '',
      data.faixa_investimento || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Landing Page Elas - API ativa')
    .setMimeType(ContentService.MimeType.TEXT);
}
