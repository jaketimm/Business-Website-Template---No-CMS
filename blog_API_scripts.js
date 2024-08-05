//////////////////////////////////////////////////
// Word Press API Blog Integration
// Replace yourwebsite.com only

document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://public-api.wordpress.com/wp/v2/sites/webdevtestblog5.wordpress.com/posts';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                // Function to truncate text to the first 50 words
                const truncateText = (text, wordLimit) => {
                    const words = text.replace(/<\/?[^>]+>/gi, ' ').split(/\s+/);
                    if (words.length > wordLimit) {
                        return words.slice(0, wordLimit).join(' ') + '...';
                    }
                    return text;
                };

                // Extracting and truncating the excerpt
                const truncatedExcerpt = truncateText(post.excerpt.rendered, 50);

                postElement.innerHTML = `
                    <h2><a href="${post.link}" target="_blank">${post.title.rendered}</a></h2>
                    <div>${truncatedExcerpt}</div>
                `;

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
});

