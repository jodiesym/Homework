// from data.js
var tableData = data;

var tbody = d3.select("tbody");

console.log(data);

data.forEach((uforeport) => {
    var row = tbody.append("tr");
    Object.entries(uforeport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

// make a go back to top button: 
// I learned how to make this go back to top button from W3school.com
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// filter search -- country 
function country(){
  var input, filter,table, tr,td,i,txtValue;
  input = document.getElementById("countryfilter");
  filter = input.value.toUpperCase();
  table = document.getElementById("ufotable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++){
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";}
  }
}
}
// filter search -- date
function date(){
  var input, filter,table, tr,td,i,txtValue;
  input = document.getElementById("datefilter");
  filter = input.value.toUpperCase();
  table = document.getElementById("ufotable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++){
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";}
  }
}
}

// filter search -- state
function state(){
  var input, filter,table, tr,td,i,txtValue;
  input = document.getElementById("statefilter");
  filter = input.value.toUpperCase();
  table = document.getElementById("ufotable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++){
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
  }
}
}