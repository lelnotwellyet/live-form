document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const table = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];

    
    loadEntries();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        if (validateAge(dob)) {
            saveEntry({ name, email, password, dob, terms });
            addEntryToTable({ name, email, password, dob, terms });
            form.reset();
        } else {
            alert('Age must be between 18 and 55 years.');
        }
    });

    function validateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age >= 18 && age <= 55;
    }

    function saveEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach(entry => addEntryToTable(entry));
    }

    function addEntryToTable(entry) {
        const row = table.insertRow();
        Object.values(entry).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value.toString();
        });
    }
});