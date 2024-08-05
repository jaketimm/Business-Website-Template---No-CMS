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


// Script to position the blog post container so it has offset from the the nav bar's bottom edge.

window.addEventListener('load', adjustBlogSectionOffset);
window.addEventListener('resize', adjustBlogSectionOffset);

function adjustBlogSectionOffset() {
    // Get the height of the navigation header
    const header = document.getElementById('cs-navigation');
    const headerHeight = header.offsetHeight;

    // Get the Blog Post Section and set its top margin
    const bannerSection = document.getElementById('posts-container');
    bannerSection.style.paddingTop = `${headerHeight + 50}px`;
}


