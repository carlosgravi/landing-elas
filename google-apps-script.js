/**
 * Google Apps Script - Landing Page Elas
 * Recebe leads (doPost) e serve dados para dashboard (doGet)
 *
 * Headers da planilha (linha 1):
 * Data/Hora | Shopping | Evento | Nome | Telefone | Email
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
      data.email || ''
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
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'status';

  if (action === 'data') {
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var rows = [];
      for (var i = 1; i < data.length; i++) {
        var row = {};
        for (var j = 0; j < headers.length; j++) {
          row[headers[j]] = data[i][j];
        }
        rows.push(row);
      }
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', total: rows.length, leads: rows }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput('Landing Page Elas - API ativa')
    .setMimeType(ContentService.MimeType.TEXT);
}
