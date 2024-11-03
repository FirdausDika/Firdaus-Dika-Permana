
let employees = JSON.parse(localStorage.getItem('employees')) || [];

function addEmployee() {
    const code = document.getElementById('employeeCode').value;
    const position = document.getElementById('employeePosition').value;

    employees.push({ code, position });
    localStorage.setItem('employees', JSON.stringify(employees));
    updateEmployeeTable();
    clearForm();
}

function updateEmployeeTable() {
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';

    employees.forEach((employee, index) => {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.code}</td>
            <td>${employee.position}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        `;
    });
}

function editEmployee(index) {
    const employee = employees[index];
    document.getElementById('employeeCode').value = employee.code;
    document.getElementById('employeePosition').value = employee.position;
    document.getElementById('employeeModalLabel').innerText = 'Edit Karyawan';
    document.getElementById('editIndex').value = index;

    const modal = new bootstrap.Modal(document.getElementById('employeeModal'));
    modal.show();
}

function saveEmployee() {
    const code = document.getElementById('employeeCode').value;
    const position = document.getElementById('employeePosition').value;
    const index = document.getElementById('editIndex').value;

    if (index) {
        // Update existing employee
        employees[index] = { code, position };
    } else {
        // Add new employee
        employees.push({ code, position });
    }

    localStorage.setItem('employees', JSON.stringify(employees));
    updateEmployeeTable();
    clearForm();
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    updateEmployeeTable();
}

function clearForm() {
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeModalLabel').innerText = 'Tambah Karyawan';
    document.getElementById('editIndex').value = '';
}

window.onload = updateEmployeeTable;
