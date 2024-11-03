
    const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    let employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Function to add employee data
    function addEmployee() {
        const code = document.getElementById('employeeCode').value;
        const name = document.getElementById('employeeName').value;
        const email = document.getElementById('employeeEmail').value;
        const address = document.getElementById('employeeAddress').value;
        const position = document.getElementById('employeePosition').value;

        // Create a new row and cells
        const newRow = employeeTable.insertRow();
        const index = employeeTable.rows.length - 1; // Get the index for the new row
        newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${code}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${address}</td>
            <td>${position}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})"><i class="bi bi-pencil-fill"></i>
                    </button>
                
                <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})"><i class="bi bi-trash-fill"></i>
                    </button>
            </td>
        `;

        // Store data in local storage
        saveToLocalStorage(code, name, email, address, position);

        // Clear input fields and hide modal
        clearForm();
        bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal')).hide();
    }

    // Function to save employee data to local storage
    function saveToLocalStorage(code, name, email, address, position) {
        employees.push({ code, name, email, address, position });
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    // Function to load employee data from local storage
    function loadFromLocalStorage() {
        employees.forEach((employee, index) => {
            const newRow = employeeTable.insertRow();
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${employee.code}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.address}</td>
                <td>${employee.position}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})"> <i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})"><i class="bi bi-trash-fill"></i></button>
                </td>
            `;
        });
    }

    // Function to clear form fields
    function clearForm() {
        document.getElementById('employeeCode').value = '';
        document.getElementById('employeeName').value = '';
        document.getElementById('employeeEmail').value = '';
        document.getElementById('employeeAddress').value = '';
        document.getElementById('employeePosition').value = '';
    }

    // Function to edit employee data
    function editEmployee(index) {
        const employee = employees[index];
        document.getElementById('employeeCode').value = employee.code;
        document.getElementById('employeeName').value = employee.name;
        document.getElementById('employeeEmail').value = employee.email;
        document.getElementById('employeeAddress').value = employee.address;
        document.getElementById('employeePosition').value = employee.position;

        // Remove employee from local storage and table
        deleteEmployee(index);
        bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal')).show();
    }

    // Function to delete employee data
    function deleteEmployee(index) {
        employees.splice(index, 1); // Remove employee from array
        localStorage.setItem('employees', JSON.stringify(employees)); // Update local storage

        // Refresh the table
        refreshTable();
    }

    // Function to refresh the table
    function refreshTable() {
        employeeTable.innerHTML = ''; // Clear the table
        loadFromLocalStorage(); // Reload employees to the table
    }

    // Load employee data when the page loads
    window.onload = loadFromLocalStorage;
