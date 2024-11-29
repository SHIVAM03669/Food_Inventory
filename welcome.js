document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#inventoryTable tbody");
    const addRowButton = document.getElementById("addRowButton");
    const logoutButton = document.getElementById("logoutButton"); // Reference the logout button

    // Load existing data from localStorage
    const inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || [];

    // Render rows
    function renderRows() {
        tableBody.innerHTML = ""; // Clear existing rows
        inventoryData.forEach((row, index) => {
            const tableRow = createRow(row, index);
            tableBody.appendChild(tableRow);
        });
    }

    // Create a row with editable fields and a delete button
    function createRow(data = {}, index) {
        const row = document.createElement("tr");

        // Define column keys for dynamic field creation
        const columns = ["itemName", "totalItems", "totalPrice", "sold", "profit", "remaining"];
        columns.forEach((key) => {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.value = data[key] || "";
            input.onchange = () => updateData(index, key, input.value);
            cell.appendChild(input);
            row.appendChild(cell);
        });

        // Add Delete button
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.color = "#ffffff";
        deleteButton.style.backgroundColor = "#ff5722";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.cursor = "pointer";
        deleteButton.onclick = () => deleteRow(index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        return row;
    }

    // Add a new row
    addRowButton.addEventListener("click", () => {
        const newRow = { itemName: "", totalItems: "", totalPrice: "", sold: "", profit: "", remaining: "" };
        inventoryData.push(newRow);
        saveData();

        // Append the new row directly to the table
        const newTableRow = createRow(newRow, inventoryData.length - 1);
        tableBody.appendChild(newTableRow);
    });

    // Update data in localStorage
    function updateData(index, key, value) {
        inventoryData[index][key] = value;
        saveData();
    }

    // Delete a row
    function deleteRow(index) {
        inventoryData.splice(index, 1); // Remove the selected row from the inventoryData array
        saveData(); // Update localStorage
        renderRows(); // Re-render the table
    }

    // Save data to localStorage
    function saveData() {
        localStorage.setItem("inventoryData", JSON.stringify(inventoryData));
    }

    // Logout functionality
    logoutButton.addEventListener("click", () => {
        // Clear user-related data (but keep inventoryData intact)
        localStorage.removeItem("username");

        // Notify the user
        alert("You have been logged out!");

        // Redirect to the login page
        window.location.href = "index.html";
    });

    // Initial rendering
    renderRows();
});
