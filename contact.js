const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const dateInput = document.getElementById('date');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submit');
const clearListBtn = document.getElementById('clearList');
const guestListContainer = document.getElementById('guestlistcontainer');
const guestForm = document.getElementById('guestForm');

// Tampilkan error di bawah input
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Reset semua pesan error
function clearErrors() {
    showError("error-name", "");
    showError("error-email", "");
    showError("error-date", "");
    showError("error-message", "");
}

// Validasi input form
function validateForm() {
    clearErrors();
    let valid = true;

    if (nameInput.value.trim() === "") {
        showError("error-name", "Nama harus diisi");
        valid = false;
    }

    if (emailInput.value.trim() === "") {
        showError("error-email", "Email harus diisi");
        valid = false;
    } else if (!emailInput.value.includes("@")) {
        showError("error-email", "Email tidak valid");
        valid = false;
    }

    if (dateInput.value.trim() === "") {
        showError("error-date", "Tanggal harus diisi");
        valid = false;
    }

    if (messageInput.value.trim() === "") {
        showError("error-message", "Pesan harus diisi");
        valid = false;
    }

    return valid;
}

// Buat elemen tamu baru
function createElementGuest(guest) {
    const div = document.createElement('div');
    div.className = 'guestinfo';
    div.innerHTML = `
        <h3>${guest.name}</h3>
        <p>${guest.email}</p>
        <p>${guest.date}</p>
        <p>${guest.message}</p>
        <button class="hapus-btn" guest-email="${guest.email}">Hapus</button>
    `;

    const hapusBtn = div.querySelector('.hapus-btn');
    hapusBtn.addEventListener('click', function () {
        guestListContainer.removeChild(div);
        removeGuestFromStorage(guest.email);
    });

    return div;
}

// Simpan tamu ke localStorage
function saveGuestToStorage(guest) {
    let guests = JSON.parse(localStorage.getItem('guests')) || [];
    guests.push(guest);
    localStorage.setItem('guests', JSON.stringify(guests));
}

// Hapus tamu dari localStorage
function removeGuestFromStorage(emailToRemove) {
    let guests = JSON.parse(localStorage.getItem('guests')) || [];
    guests = guests.filter(guest => guest.email !== emailToRemove);
    localStorage.setItem('guests', JSON.stringify(guests));
}

// Ambil data dari localStorage saat halaman dimuat
window.addEventListener('DOMContentLoaded', function () {
    const guests = JSON.parse(localStorage.getItem('guests')) || [];
    guests.forEach(guest => {
        const guestItem = createElementGuest(guest);
        guestListContainer.appendChild(guestItem);
    });
});

// Submit form
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    const guest = {
        name: nameInput.value,
        email: emailInput.value,
        date: dateInput.value,
        message: messageInput.value
    };

    const guestItem = createElementGuest(guest);
    guestListContainer.appendChild(guestItem);
    saveGuestToStorage(guest);

    // Reset form
    nameInput.value = '';
    emailInput.value = '';
    dateInput.value = '';
    messageInput.value = '';
    clearErrors();
});

// Hapus semua tamu
clearListBtn.addEventListener('click', function () {
    guestListContainer.innerHTML = '';
    localStorage.removeItem('guests');
});
