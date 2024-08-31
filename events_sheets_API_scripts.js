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
        var outputHtml = '';

        if (values && values.length > 0) {
            // Create table rows
            outputHtml += '<div id="events-table">';
            values.forEach(function (row, index) {
                // Adjust the HTML structure to match your styling needs
                outputHtml += '<div class="row">';
                outputHtml += '<div class="col-a">' + escapeHtml(row[0] || '') + '</div>';
                outputHtml += '<div class="col-b">Date: ' + escapeHtml(row[1] || '') + '</div>';
                outputHtml += '<div class="time">Time(s): ' + escapeHtml(row[2] || '') + '</div>';
                outputHtml += '</div>';
            });
            outputHtml += '</div>';

            document.getElementById('output').innerHTML = outputHtml;
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

