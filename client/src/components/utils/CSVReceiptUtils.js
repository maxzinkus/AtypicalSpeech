// exports.csv_receipt = () => {
//     var csvFileData = [  
//         ['Alan Walker', 'Singer'],  
//         ['Cristiano Ronaldo', 'Footballer'],  
//         ['Saina Nehwal', 'Badminton Player'],  
//         ['Arijit Singh', 'Singer'],  
//         ['Terence Lewis', 'Dancer']  
//      ];  
         
// }

function format_header_rows (rows) {
    var header = ""
    for (var i = 0; i < rows.length; i++) {
        header += rows[i]
        if (i !== rows.length - 1) {
            header += ','
        }
    }
    header += '\n'
    console.log("header: ", header)
    return header
}

// create a user-defined function to download CSV file   
exports.create_csv_receipt = (data, rows, title) => {  
       
    // define the heading for each row of the data  
    var csv = format_header_rows(rows)
      
    // merge the data with CSV  
    data.forEach(function(row) {  
            csv += row.join(',');  
            csv += "\n";  
    });  
   
    // display the created CSV data on the web browser   
    document.write(csv);  
  
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    hiddenElement.target = '_blank';  
      
    // provide the name for the CSV file to be downloaded  
    hiddenElement.download = title + '.csv';  
    hiddenElement.click();  
}  