const numPages = document.querySelectorAll('.story').length;

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
  event.preventDefault();

  if (page !== numPages) {
    page++;
    updatePolygonArrays('svg-' + page, 1);
    updateStory(page);
    updateProgress(page);
  }
}

const prevPage = () => {
  event.preventDefault();

  if (page !== 1) {
    page--;
    updatePolygonArrays('svg-' + page, 1);
    updateStory(page);
    updateProgress(page);
  }
}

