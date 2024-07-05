document.addEventListener('DOMContentLoaded', function() {
    const posts = [
        {
            title: 'First Post',
            content: 'This is the content of the first post.',
            url: 'posts/post1.html',
            category: 'Technology'
        },
        {
            title: 'Second Post',
            content: 'This is the content of the second post.',
            url: 'posts/post2.html',
            category: 'Lifestyle'
        },
        {
            title: 'Third Post',
            content: 'This is the content of the third post.',
            url: 'posts/post3.html',
            category: 'Travel'
        },
        // Add more posts as needed
    ];

    const postsContainer = document.getElementById('posts');
    const categoriesContainer = document.getElementById('categories');
    const searchInput = document.getElementById('search');

    function displayPosts(filteredPosts) {
        postsContainer.innerHTML = '';
        filteredPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const postTitle = document.createElement('h2');
            postTitle.innerText = post.title;

            const postContent = document.createElement('p');
            postContent.innerText = post.content;

            const postLink = document.createElement('a');
            postLink.href = post.url;
            postLink.innerText = 'Read more';

            postElement.appendChild(postTitle);
            postElement.appendChild(postContent);
            postElement.appendChild(postLink);

            postsContainer.appendChild(postElement);
        });
    }

    function getUniqueCategories() {
        const categories = posts.map(post => post.category);
        return [...new Set(categories)];
    }

    function displayCategories() {
        const uniqueCategories = getUniqueCategories();
        categoriesContainer.innerHTML = '<option value="All">All</option>';
        uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.innerText = category;
            categoriesContainer.appendChild(option);
        });
    }

    function filterPostsByCategory(category) {
        if (category === 'All') {
            return posts;
        }
        return posts.filter(post => post.category === category);
    }

    function filterPostsBySearch(query) {
        return posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.content.toLowerCase().includes(query.toLowerCase()));
    }

    categoriesContainer.addEventListener('change', function() {
        const selectedCategory = categoriesContainer.value;
        const filteredPosts = filterPostsByCategory(selectedCategory);
        displayPosts(filteredPosts);
    });

    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        const filteredPosts = filterPostsBySearch(query);
        displayPosts(filteredPosts);
    });

    // Initial display
    displayCategories();
    displayPosts(posts);
});
