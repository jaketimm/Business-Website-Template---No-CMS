var API_KEY = 'AIzaSyBoE1l0ANCfKp7nbESVXprAJdonqRsvwC0';  // Google Cloud API key
var SHEET_ID = '1Tp5iSPMOH0D6Up66iLtwkhGLbmGcJBmaas3PCcs4Xm4';  // Google Sheet ID
var RANGE = 'Sheet1!A2:D25'; // Cell Range to read

function onApiLoad() {
    gapi.load('client', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
    }).then(function () {
        console.log('API client initialized.');
        readSheetData();
    }).catch(function (error) {
        console.error('Error initializing API client:', error);
    });
}

function readSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE
    }).then(function (response) {
        var values = response.result.values;
        if (values && values.length > 0) {
            var output = '';
            for (var i = 0; i < values.length; i++) {
                output += '<div class="row">';
                output += '<div class="col-a">' + (values[i][0] || '') + '</div>';
                output += '<div class="col-b">Date: ' + (values[i][1] || '') + '</div>';
                output += '<div class="time">Time(s): ' + (values[i][2] || '') + '   ' + (values[i][3] || '') + '</div>';
                output += '</div>';
            }
            document.getElementById('output').innerHTML = output;
        } else {
            document.getElementById('output').innerText = 'No data found.';
        }
    }).catch(function (error) {
        console.error('Error reading data:', error);
        document.getElementById('output').innerText = 'Error fetching data.';
    });
}
