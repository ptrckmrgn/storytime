const numPages = document.querySelectorAll('.story').length;

// Update the part of the story being shown
const updateStory = (page) => {
    const stories = document.querySelectorAll('.story');

    stories.forEach((story, i) => {
        story.classList.add('hidden');
    });

    document.querySelector('#story-' + page).classList.remove('hidden');
}

// Update the progress bar
const updateProgress = (page) => {
    const progress = document.querySelector('#progress');

    const value = (page) / (numPages - 1) * 100;

    progress.style.width = value + '%';
}

// Update the navigation buttons
const updateNavigation = (page) => {
    const navigations = document.querySelectorAll('.navigation');

    navigations.forEach((navigation, i) => {
        navigation.classList.add('hidden');
    });
     if (page != 0) {
         document.querySelector('#navigation-' + page).classList.remove('hidden');
     }
}

// Load/unload the concise version of the story
const loadConcise = (load) => {
    const concise = document.querySelector('#concise');

    if (load) {
        concise.classList.remove("hidden");
    } else {
        concise.classList.add("hiding");

        // Delay "z-index" to allow opacity fade to finish
        setTimeout(() => {
            concise.classList.remove("hiding");
            concise.classList.add("hidden");
        }, 400);
    }
}

// Load the story, svg and progress for the given page
const loadPage = (page) => {
    if (page !== -1 ) {
        loadConcise(false);
        updatePolygonArrays(page, 1);
        updateStory(page);
        updateProgress(page);
        updateNavigation(page);
    } else {
        loadConcise(true);
    }
}

// Load the story, svg and progress for the given page
const findPage = () => {
    const hash = window.location.hash.substr(1);
    let page = 0;

    if (hash.substring(0, 4) === 'page') {
        page = parseInt(hash.match(/\d+/)[0]);
        loadPage(page);
    } else if (hash === 'concise') {
        loadPage(-1);
    }
}

// Removes svg attributes that interfere so that opacity/color are not doubled
const initialiseSvg = () => {
    const paths = document.querySelector('#svg-holder').querySelectorAll('path');

    paths.forEach((path, i) => {
        path.setAttribute('fill', '');
        path.setAttribute('fill-opacity', '');
    });

    updatePolygonArrays(0, 0);
}

// Prevent viewing from small devices.
const checkDevice = () => {
    const maxWidth = 950;
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if (width < maxWidth) {
        document.querySelector('#block').classList.remove("hidden");
    } else {
        document.querySelector('#block').classList.add("hidden");
    }
}

// Update events
window.onload = () => {
    initialiseSvg();
    checkDevice();
    findPage();
}

window.onhashchange = () => {
    findPage();
};

window.onresize = () => {
    checkDevice();
}

window.onkeydown = (event) => {
    const hash = window.location.hash.substr(1);
    let page;

    if (hash.substring(0, 4) === 'page') {
        page = parseInt(hash.match(/\d+/)[0]);
    } else if (hash === '') {
        page = 0;
    }

    if (event.keyCode == '37') { // Left arrow
        if (page > 0) {
            window.location.hash = '#page-' + (page - 1);
        }
    }
    else if (event.keyCode == '39') { // Right arrow
        if (page < numPages - 1) {
            window.location.hash = '#page-' + (page + 1);
        }
    }
};