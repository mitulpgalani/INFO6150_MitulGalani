//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return (this.mytitle);
}

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

window.onload = function () {
  const dropDownTextAreas = document.querySelectorAll('.dropDownTextArea');
    dropDownTextAreas.forEach(function (row) {
        row.style.display = 'none';
    });
    personalDetails();
};

function personalDetails() {
  const name = 'Mitul Galani';
  const id = '002885963';

  document.getElementById('nameDisplay').textContent = `Name - ${name}`;
  document.getElementById('idDisplay').textContent = `NUID - ${id}`;
}

function addrecord() {
  var table = document.getElementById("myTable");
  var stuName = table.lastElementChild.lastElementChild?.previousElementSibling?.firstElementChild?.nextElementSibling?.innerHTML || "Student 0";
  var budget = 12345;

  var lastIndex = stuName.split(" ")[1];

  const row = table.insertRow(-1);
  row.innerHTML =
    `<td><input type="checkbox" onclick="onClickCheckBox(this)" /><br /><br /><img src="./down.png" width="25px" onclick="tableView(this)"></td>
        <td>Student ${parseInt(lastIndex) + 1}</td>
        <td>Teacher ${parseInt(lastIndex) + 1}</td>
        <td>Approved</td>
        <td>Fall</td>
        <td>TA</td>
        <td>${budget + parseInt(lastIndex) + 1}</td>
        <td>100%</td>`;

  const expandedRow = table.insertRow(-1);
  expandedRow.className = 'expandedTextArea';
  expandedRow.innerHTML = `
        <td colspan="8">
            Advisor: ${parseInt(lastIndex) + 1}<br /><br />
            Award Details<br />
            Summer 1-2014(TA)<br />
            Budget Number: <br />
            Tuition Number: <br />
            Comments:<br /><br /><br />
            Award Status:<br /><br /><br />
        </td>
    `;
  expandedRow.style.display = "none";

  alert(`Student ${parseInt(lastIndex) + 1} Record Added Successfully`);
}

function tableView(element) {


  var rowDetails = element.parentElement.parentElement.nextElementSibling;

  if (rowDetails.style.display === "none" || rowDetails.style.display === "") {
    rowDetails.style.display = "table-row";
  } else {
    rowDetails.style.display = "none";
  }
}

let myArray = 0;

function onClickCheckBox(checkBox) {

  var table = document.getElementById("myTable");
  var selectCheckedRow = checkBox.parentElement.parentElement;
  var getTableHeader = table.lastElementChild.firstChild;

  var checkedElms = table.querySelectorAll(":checked").length;

  if (checkBox.checked == true) {
    selectCheckedRow.style.backgroundColor = "Yellow";
    if (checkBox.checked == true && checkedElms <= 1) {
      var delButtonRowHead = document.createElement("th");
      delButtonRowHead.innerHTML = "Delete";
      getTableHeader.appendChild(delButtonRowHead);
      var editButtonRowHead = document.createElement("th");
      editButtonRowHead.innerHTML = "Edit";
      getTableHeader.appendChild(editButtonRowHead);
    }
    else if (checkBox.checked == false && checkedElms > 1) {
    }

    var delButton = document.createElement("td");

    delButton.innerHTML =
      '<button id="deleted" type="button" onClick="onDeleteRow(this)"> Delete </button>';

    selectCheckedRow.appendChild(delButton);

    var editButton = document.createElement("td");

    editButton.innerHTML =
      '<button id="edited" type="button" onClick="onEditRow(this)"> <img src="./pencil.png" width="20px"> </button>';

    selectCheckedRow.appendChild(editButton);
  } else {
    selectCheckedRow.style.backgroundColor = "White";

    selectCheckedRow.deleteCell(9);
    getTableHeader.deleteCell(9);

    selectCheckedRow.deleteCell(8);
    getTableHeader.deleteCell(8);
  }

  if (checkedElms >= 1) {
    document.querySelector("#button").disabled = false;
  } else {
    document.querySelector("#button").disabled = true;
  }
}

function onDeleteRow(delButtonRef) {
  var table = document.getElementById("myTable");
  var getTableHeader = table.lastElementChild.firstChild;
  myArray += 1;

  var selectedRow = delButtonRef.parentElement.parentElement;
  var studentName = selectedRow.cells[1].textContent;
  var index = selectedRow.rowIndex;

  if (confirm("Do you really want to delete this Row ?")) {
    document.getElementById("myTable").deleteRow(selectedRow.rowIndex);
    var index3 = table.querySelectorAll(":checked").length;
    if (index3 == 0) {
      getTableHeader.deleteCell(-1);
      getTableHeader.deleteCell(-1);
      table.deleteRow(index);
      alert(studentName + " Record Deleted Successfully");

    }

    if (index3 == 0) {
      document.querySelector("#button").disabled = true;

    } else if (index3 > 1) {
      document.querySelector("#button").disabled = false;
    }
  }
}

function onEditRow(editButtonRef) {
  var selectedRow = editButtonRef.parentElement.parentElement;
  var studentName = selectedRow.cells[1].textContent;
  var rowData = Array.from(selectedRow.cells).map(cell => cell.textContent);

  var editConfirmation = prompt("Edit details of " + studentName + ":"+  "\n" + rowData[1] + "\n" + rowData[2] + "\n" + rowData[3] + "\n" + rowData[4] + "\n" + rowData[5] + "\n" + rowData[6] + "\n" + rowData[7]);

  if (editConfirmation !== null) { 
      if (confirm("Do you want to update " + studentName + "'s data?")) {
          alert(studentName + " data updated successfully");
      }
  }
}





