// Replace with your Facebook Page ID and Access Token
const pageId = '2304213989939226';  // Example: 'nasa'
const accessToken = 'EAAPiEPnX5RsBO7SkV70EGgU10JTmPXo2hRtRVlosHlE6Q60YFzSNAPNnH904u7qLBujr4a4NjKU6KYbP8JsFMkmNDEmQ584HeLT6ZCIvYcKKKmYsS9lDHSo8HmeW7OZC0BV3auEKAey4ZCXPkbKdvLqZAIDcGOr15bsB5aVNrhzozDcdZBg5lbrhwFeYZAqY9rJXCN75Lv03Sf8RIBPb6rp1WZBubkZD';  // You need to generate an access token

// Container for displaying posts
const postsContainer = document.getElementById('facebook-posts-container');

// Facebook Graph API URL to fetch the latest posts
const apiUrl = `https://graph.facebook.com/v15.0/${pageId}/posts?access_token=${accessToken}&limit=3`;

async function fetchFacebookPosts() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            data.data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('facebook-post');
                
                // Create the content to display
                const postContent = document.createElement('div');
                postContent.classList.add('post-content');
                postContent.innerHTML = `
                    <p>${post.message || 'No content available'}</p>
                    <a href="https://www.facebook.com/${pageId}/posts/${post.id.split('_')[1]}" target="_blank">View on Facebook</a>
                `;
                
                postElement.appendChild(postContent);
                postsContainer.appendChild(postElement);
            });
        } else {
            postsContainer.innerHTML = '<p>No posts found or unable to retrieve data.</p>';
        }
    } catch (error) {
        console.error('Error fetching Facebook posts:', error);
        postsContainer.innerHTML = '<p>There was an error fetching the posts.</p>';
    }
}

// Fetch and display the posts when the page loads
fetchFacebookPosts();