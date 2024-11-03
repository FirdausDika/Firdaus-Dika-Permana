
    let divisions = JSON.parse(localStorage.getItem('divisions')) || [];

    function updateDivisionTable() {
        const tableBody = document.querySelector('#divisionTable tbody');
        tableBody.innerHTML = '';

        divisions.forEach((division, index) => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${division.code}</td>
                <td>${division.name}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editDivision(${index})">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteDivision(${index})">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            `;
        });
    }

    function saveDivision() {
        const code = document.getElementById('divisionCode').value;
        const name = document.getElementById('divisionName').value;
        const index = document.getElementById('editIndex').value;

        if (index) {
            // Update existing division
            divisions[index] = { code, name };
        } else {
            // Add new division
            divisions.push({ code, name });
        }

        localStorage.setItem('divisions', JSON.stringify(divisions));
        updateDivisionTable();
        clearForm();
    }

    function editDivision(index) {
        const division = divisions[index];
        document.getElementById('divisionCode').value = division.code;
        document.getElementById('divisionName').value = division.name;
        document.getElementById('addDivisionModalLabel').innerText = 'Edit Divisi';
        document.getElementById('editIndex').value = index;

        const modal = new bootstrap.Modal(document.getElementById('addDivisionModal'));
        modal.show();
    }

    function deleteDivision(index) {
        divisions.splice(index, 1);
        localStorage.setItem('divisions', JSON.stringify(divisions));
        updateDivisionTable();
    }

    function clearForm() {
        document.getElementById('divisionForm').reset();
        document.getElementById('addDivisionModalLabel').innerText = 'Tambah Divisi';
        document.getElementById('editIndex').value = '';
    }

    window.onload = updateDivisionTable;
