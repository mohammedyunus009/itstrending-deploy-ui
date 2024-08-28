document.addEventListener("DOMContentLoaded", function() {
    // Fetch the header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('headerPlaceholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
    // Fetch the footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footerPlaceholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});