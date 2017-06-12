const numPages = document.querySelectorAll('.story').length;

// window.addEventListener("hashchange", (e) => {
//     page
//     console.log(window.location.hash.substr(1).match(/\d+/)[0]);
// });

const redirect = () => {
    const hash = window.location.hash.substr(1);

    if (hash === '') {
        const page = 1;

        updatePolygonArrays('svg-' + page, 1);
        updateStory(page);
        updateProgress(page);
    }
    else if (hash.substring(0,4) === 'page') {
        const page = hash.match(/\d+/)[0];

        updatePolygonArrays('svg-' + page, 1);
        updateStory(page);
        updateProgress(page);
    }
    else {
        // modal
    }
}

window.onload = () => {
    redirect();
}

window.onhashchange = () => {
    redirect();
};

const updateStory = (page) => {
    const stories = document.querySelectorAll('.story');

    stories.forEach((story, i) => {
        story.classList.add('hidden');
    });

    document.querySelector('#story-' + page).classList.remove('hidden');
}

const updateProgress = (page) => {
    const progress = document.querySelector('#progress');

    const value = (page - 1) / (numPages - 1) * 100;

    progress.style.width = value + '%';
}

const nextPage = () => {
  //event.preventDefault();

  if (page !== numPages) {
    page++;
    updatePolygonArrays('svg-' + page, 1);
    updateStory(page);
    updateProgress(page);
  }
}

const prevPage = () => {
  //event.preventDefault();

  if (page !== 1) {
    page--;
    updatePolygonArrays('svg-' + page, 1);
    updateStory(page);
    updateProgress(page);
  }
}

