// Renders a table with headers + rows
export const Table = (headers, rows) => {
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "10px";

    // header row
    const trHead = document.createElement("tr");
    headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        th.style.padding = "5px";
        trHead.appendChild(th);
    });
    table.appendChild(trHead);

    // data rows
    rows.forEach(r => {
        const tr = document.createElement("tr");
        r.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            td.style.padding = "5px";
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    return table;
};
