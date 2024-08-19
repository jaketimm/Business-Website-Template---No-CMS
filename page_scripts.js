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

// Single function to adjust padding based on the navigation header height
function adjustSectionsOffset() {
    // Get the height of the navigation header
    const header = document.getElementById('cs-navigation');
    if (!header) return;  // Ensure header exists

    const headerHeight = header.offsetHeight;

    // Adjust Banner Section (both cases)
    const bannerSection = document.getElementById('Banner-Section');
    if (bannerSection) {
        bannerSection.style.paddingTop = `${headerHeight}px`;
    }

    const bannerSectionText = document.getElementById('Banner-Section-With-Text');
    if (bannerSectionText) {
        bannerSectionText.style.paddingTop = `${headerHeight}px`;
    }

    // Adjust Topper Section
    const topperSection = document.getElementById('cs-content-831');
    if (topperSection) {
        topperSection.style.paddingTop = `${headerHeight + 50}px`;
    }

}

// Attach event listeners once
window.addEventListener('load', adjustSectionsOffset);
window.addEventListener('resize', adjustSectionsOffset);



