// Absence Email Confirmation
// By Kurt Kaiser

const ss = SpreadsheetApp.getActive();
var sheet = ss.getActiveSheet();

// Get header to text to send in email
function getHeader(){
  header = sheet.getRange(1, 1, 1, 8).getValues();
  //Log for debugging
  Logger.log("Header: " + header);
  return header;
}

// Get submitted data info
function getData() {
  //find last row, new data submitted there
  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(lastRow, 1, 1, 8).getValues();
  return data;
}

//Make simple data table for html email
function makeTable(header, data){
  var table = "";
  for (i = 0; i < 8; i++){
    table = table + '<tr><td>' + header[0][i] + '</td><td>' + data[0][i] + '</td></tr>';
  }
  return table;
}

// Create email
function createEmail(table){
  var title = "Form Submitted Confirmation";
  var html = '<body font-family: Arial style="text-align:center;">\
  <div style="width: 500px; border: 1px solid #555555; background:#CCCCCC; margin-left:auto; margin-right:auto;padding:10px;">\
    <div style="border: 1px solid #555555;background:white; padding:10px;">\
    <img src="http://techyesplease.com/wp-content/uploads/2015/10/fa-check-circle-o_256_0_000000_none.png" width="120" style="margin:5px">\
      <br /><h3>' + title + '</h3><h4><table border="1px solid #555555" style="table-layout:fixed; width:450px; text-align:center; \
      border-collapse: collapse; margin-left:auto; margin-right:auto;">'
       + table +
      '</table><br />If you have any questions, please respond to this email.</h4></div></div><br /><br /><br />© 2015 Kurt Kaiser\
      <br /><a href="http://bit.ly/absenceResponse">techyesplease.com</a></body>';
  return html;
}

//
// Main - run all other functions then send email
function main(){
  var header = getHeader();
  var data = getData();
  var table = makeTable(header, data);
  var html = createEmail(table);
  // Need to go out to 8 to include column 7!!
  MailApp.sendEmail(data[0][7], "Form Submission Confirmed", "", {
    htmlBody: html
  });
  // Make a record showing email sent
  sheet.getRange(sheet.getLastRow(), 9).setValue("Sent");
  SpreadsheetApp.flush();
}








