// Scripts to run the top banner nav bar

// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

CShamburgerMenu.addEventListener('click', function () {
	CShamburgerMenu.classList.toggle('cs-active');
	CSnavbarMenu.classList.toggle('cs-active');
	CSbody.classList.toggle('cs-open');
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector('#cs-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
	const onClick = () => {
		item.classList.toggle('cs-active');
	};
	item.addEventListener('click', onClick);
}

// Script to position the banner so the top edge always aligns with the nav bar's bottom edge.

window.addEventListener('load', adjustBannerSectionOffset);
window.addEventListener('resize', adjustBannerSectionOffset);

function adjustBannerSectionOffset() {
    // Get the height of the navigation header
    const header = document.getElementById('cs-navigation');
    const headerHeight = header.offsetHeight;

    // Get the Banner Section and set its top margin
    const bannerSection = document.getElementById('Banner-Section');
    bannerSection.style.paddingTop = `${headerHeight}px`;
}

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

                postElement.innerHTML = `
                    <h2><a href="${post.link}" target="_blank">${post.title.rendered}</a></h2>
                    <div>${post.excerpt.rendered}</div>
                `;

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
});
