var API_KEY = 'AIzaSyBoE1l0ANCfKp7nbESVXprAJdonqRsvwC0';  // Google Cloud API key
var SHEET_ID = '1Tp5iSPMOH0D6Up66iLtwkhGLbmGcJBmaas3PCcs4Xm4';  // Google Sheet ID
var RANGE = 'Sheet1!A2:C25'; // Cell Range to read

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
        var output = '';

        if (values && values.length > 0) {
            for (var i = 0; i < values.length; i++) {
                var colA = escapeHtml(values[i][0] || '');
                var colB = escapeHtml('Date: ' + (values[i][1] || ''));
                var time = escapeHtml('Time(s): ' + (values[i][2] || ''));

                output += colA + ' | ' + colB + ' | ' + time + '\n';
            }
            document.getElementById('output').textContent = output;
        } else {
            document.getElementById('output').textContent = 'No data found.';
        }
    }).catch(function (error) {
        console.error('Error reading data:', error);
        document.getElementById('output').textContent = 'Error fetching data.';
    });
}

// Function to escape HTML special characters to prevent rendering HTML
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

