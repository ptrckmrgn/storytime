const updateStory = (page) => {
    const stories = document.querySelectorAll('.story');
    stories.forEach((story, i) => {
        story.classList.add('hidden');
    });

    document.querySelector('#story-' + page).classList.remove('hidden');
}