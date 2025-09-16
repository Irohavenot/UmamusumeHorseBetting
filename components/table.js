

export const table = () => {
    let table = document.createElement("table");

    table.border = '1';

    let row = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.textContent = "Name";

    let cell2 = document.createElement("td");
    cell2.textContent = "Course";

    let cell3 = document.createElement("td");
    cell3.textContent = "Year and Section";

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    let row1 = document.createElement("tr");

    let cell4 = document.createElement("td");
    cell4.textContent = "Adrian Benedict";

    let cell5 = document.createElement("td");
    cell5.textContent = "BSIT";

    let cell6 = document.createElement("td");
    cell6.textContent = "4th Year";

    row1.appendChild(cell4);
    row1.appendChild(cell5);
    row1.appendChild(cell6);

    table.appendChild(row);
    table.appendChild(row1);

    document.body.appendChild(table)


}

// table();