const nextPage = () => {
  event.preventDefault();

  if (page !== numPages) {
    page++;
    updatePolygonArrays('svg-' + page, 1);

    document.querySelector('#story-1').style.display = 'block';
  }
}

const prevPage = () => {
  event.preventDefault();

  if (page !== 1) {
    page--;
    updatePolygonArrays('svg-' + page, 1);
  }
}