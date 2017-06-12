const numPages = document.querySelectorAll('.story').length;

// Update the part of the story being shown.
const updateStory = (page) => {
    const stories = document.querySelectorAll('.story');

    stories.forEach((story, i) => {
        story.classList.add('hidden');
    });

    document.querySelector('#story-' + page).classList.remove('hidden');
}

// Update the progress bar.
const updateProgress = (page) => {
    const progress = document.querySelector('#progress');

    const value = (page) / (numPages - 1) * 100;

    progress.style.width = value + '%';
}

// Load the story, svg and progress for the given page.
const loadPage = () => {
    const hash = window.location.hash.substr(1);
    let page = 0;

    if (hash.substring(0,4) === 'page') {
        page = hash.match(/\d+/)[0];
    }

    updatePolygonArrays(page, 1);
    updateStory(page);
    updateProgress(page);
}

// Removes svg attributes that interfere so that opacity/color are not doubled.
const initialiseSvg = () => {
  const paths = document.querySelector('#svg-holder').querySelectorAll('path');

  paths.forEach((path, i) => {
    path.setAttribute('fill', '');
    path.setAttribute('fill-opacity', '');
  });

  updatePolygonArrays(0, 0);
}

// Update events
window.onload = () => {
    initialiseSvg();
    loadPage();
}
window.onhashchange = () => {
    loadPage();
};