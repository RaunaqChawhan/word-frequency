var button = document.getElementById("data-file");
var para = document.getElementById("text");

button.addEventListener('click', getData);

function getData() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            var receivedString = this.responseText;
            para.textContent = receivedString;
            var extractedString = receivedString.replace(/[\?\.:;!,"@\-\(\)\/]/gm, " ")
                .replace(/^[\d]+.?/gm, "")
                .replace(/[\r\n\t]/gm, " ")
                .replace(/[ ]{2,}/gm, " ")
                .trim()
                .toLowerCase();
            
            var wordFrequency = extractedString.split(/\s/)
            .reduce(function(output, word) {
                return Object.assign(output, { [word]: output[word]? output[word] + 1 : 1 })
            }, {});
            
            var sortedWords = Object.entries(wordFrequency)
            .map(function(current) {
                return [current[1], current[0]];
            }).sort(function(a, b) {
                /*console.log(parseInt(a));
                console.log(b);*/
                return parseInt(b) - parseInt(a);
            }).map(function(current, index) {
                return [index + 1, current[0], current[1]];
            });
            
            var countButton = document.getElementById('count');
            countButton.addEventListener('click', function() {
                var tableColumnHeading = ["Serial No.", "Count", "Word"];
                var table = document.createElement("table");
                
                //Table headings
                var tr = document.createElement("tr");
                table.appendChild(tr);
                tableColumnHeading.forEach(function(heading) {
                    var th = document.createElement("th");
                    th.appendChild(document.createTextNode(heading));
                    tr.appendChild(th);
                });
                
                //Table rows
                
                table.appendChild(tr);
                sortedWords.forEach(function(row) {
                    var tr = document.createElement("tr");
                    row.forEach(function(el) {
                        var td = document.createElement("td");
                        td.appendChild(document.createTextNode(el));
                        tr.appendChild(td);
                    });
                  table.appendChild(tr);  
                });
                
                var displayTable = document.getElementById("add-table");
                displayTable.appendChild(table);
                /*console.log(displayTable);
                console.log(sortedWords);*/
            });
            
        }
    };
    
    xhttp.open('GET', 'data.txt');
    xhttp.send();
}
