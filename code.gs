function doGet(e) {
  var template = HtmlService.createTemplateFromFile('index');
  return template.evaluate()
    .setTitle('Marksheet Portal')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getStudentData(seatNo) {
  const ss = SpreadsheetApp.openById('==');
  const ws = ss.getSheetByName('Sheet1');
  const data = ws.getDataRange().getValues();
  const row = data.find(r => r[0].toString().trim() === seatNo);
  if (!row) return null;
  let formattedDate = "";
  if (Object.prototype.toString.call(row[2]) === '[object Date]') {
    formattedDate = Utilities.formatDate(new Date(row[2]), Session.getScriptTimeZone(), "dd/MM/yyyy");
  } else {
    formattedDate = row[2] || "N/A";
  }
  const result = {
    seatNo: row[0],
    std: row[1],
    examDate: formattedDate,
    studentName: row[3],
    school: row[4],
    center: row[5],
    district: row[6],
    paper1: row[7],
    paper2: row[8]
  };
  
  return result;
}
