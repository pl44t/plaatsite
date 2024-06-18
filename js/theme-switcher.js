document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switch');
    const body = document.body;

    // Load the saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-theme') {
            themeSwitcher.checked = true;
        }
    } else {
        body.classList.add('light-theme'); // Default theme
    }

    themeSwitcher.addEventListener('change', () => {
        if (themeSwitcher.checked) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // Set the initial theme based on the checkbox state
    if (themeSwitcher.checked) {
        body.classList.add('dark-theme');
    } else {
        body.classList.add('light-theme');
    }
});
