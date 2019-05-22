var button = document.getElementById("data-file");
var para = document.getElementById("text");

button.addEventListener('click', getData);

function getData() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            para.textContent = this.responseText;
        }
    };
    
    xhttp.open('GET', 'data.txt');
    xhttp.send();
}