document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = [
        {
            title: 'First Blog Post',
            content: 'This is the content of the first blog post.'
        },
        {
            title: 'Second Blog Post',
            content: 'This is the content of the second blog post.'
        }
    ];

    const blogPostsContainer = document.getElementById('blogPosts');

    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        
        const postTitle = document.createElement('h2');
        postTitle.textContent = post.title;
        postElement.appendChild(postTitle);
        
        const postContent = document.createElement('p');
        postContent.textContent = post.content;
        postElement.appendChild(postContent);
        
        blogPostsContainer.appendChild(postElement);
    });

    const menuButton = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.getElementById('closeButton');

    menuButton.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    closeButton.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });
});
