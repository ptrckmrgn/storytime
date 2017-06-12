const nextPage = () => {
  event.preventDefault();

  //
  if (page !== numPages) {
    page++;
    updatePolygonArrays('svg-' + page, 1);
    updateStory(page);
  }
}

const prevPage = () => {
  event.preventDefault();

  if (page !== 1) {
    page--;
    updatePolygonArrays('svg-' + page, 1);
    updateStory(page);
  }
}