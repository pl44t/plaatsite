document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const mainContent = document.getElementById('main-content');
    const links = document.querySelectorAll('nav ul li a');

    burger.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    nav.addEventListener('mouseleave', () => {
        nav.classList.remove('show');
    });

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            loadPage(page);
            nav.classList.remove('show');
        });
    });

    function loadPage(page) {
        fetch(`./${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                mainContent.innerHTML = data;
            })
            .catch(error => {
                mainContent.innerHTML = `<p>Sorry, the content could not be loaded.</p>`;
                console.error('Error loading page:', error);
            });
    }

    // Load the home page by default
    loadPage('home');
});


document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const mainContent = document.getElementById('main-content');

    // Load the last visited page if available
    const lastPage = sessionStorage.getItem('lastPage');
    if (lastPage) {
        loadPage(lastPage);
    } else {
        loadPage('home');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            loadPage(page);
        });
    });

    function loadPage(page) {
        sessionStorage.setItem('lastPage', page);
        fetch(`../html/${page}.html`)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                history.pushState(null, '', `#${page}`);
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Handle browser back and forward navigation
    window.addEventListener('popstate', () => {
        const page = location.hash.replace('#', '') || 'home';
        loadPage(page);
    });
});
