let currentRow; // Variabel untuk menyimpan baris yang sedang diedit

// Fungsi untuk membuka modal status dan menyimpan baris saat ini
function openStatusModal(button) {
    const row = button.closest('tr'); // Temukan baris dari tombol yang diklik
    currentRow = row; // Simpan baris saat ini di variabel global
    const statusCell = row.querySelector('.status'); // Ambil cell status
    
    // Set opsi status default di dropdown berdasarkan status saat ini
    document.getElementById('newStatus').value = statusCell ? statusCell.innerText : "Disetujui";
    
    // Tampilkan modal
    const statusModal = new bootstrap.Modal(document.getElementById('statusModal'));
    statusModal.show();
}

// Fungsi untuk mengubah status pada baris yang dipilih
function changeStatus() {
    const newStatus = document.getElementById('newStatus').value;
    
    // Temukan cell status pada baris yang sedang diedit
    const statusCell = currentRow.querySelector('td:nth-child(7)');
    
    // Ubah teks cell status
    if (statusCell) {
        statusCell.innerText = newStatus;
    }
    
    // Tutup modal
    const statusModal = bootstrap.Modal.getInstance(document.getElementById('statusModal'));
    statusModal.hide();
}
