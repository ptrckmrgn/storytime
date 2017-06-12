let toPolygonArray = [];
let fromPolygonArray = [];

// get points of the paths using regex
const getCoordinates = (path) => {
  return path.getAttribute('d').match(/M(-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)L(-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)L(-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)Z/);
};

const createPathObjects = (paths) => {
  const pathsArray = [];

  paths.forEach((path, i) => {
    const coordinates = getCoordinates(path);

    pathsArray.push({
      fill: path.getAttribute('fill'),
      opacity: path.getAttribute('fill-opacity'),
      one: coordinates[1],
      two: coordinates[2],
      three: coordinates[3],
      four: coordinates[4],
      five: coordinates[5],
      six: coordinates[6]
    });
  });

  return pathsArray;
}

const animatePolygons = (duration) => {
  const paths = document.querySelector('#svg-holder').querySelectorAll('path');

  fromPolygonArray = createPathObjects(paths);

  fromPolygonArray.forEach((obj, i) => {
    TweenMax.to(obj, duration, {
      one: toPolygonArray[i].one,
      two: toPolygonArray[i].two,
      three: toPolygonArray[i].three,
      four: toPolygonArray[i].four,
      five: toPolygonArray[i].five,
      six: toPolygonArray[i].six,
      ease: Power3.easeOut,
      onUpdate: () => {
        paths[i].setAttribute("d", `M${obj.one},${obj.two}L${obj.three},${obj.four}L${obj.five},${obj.six}Z`);
      }
    });
  });

  // animate color
  paths.forEach((path, i) => {
    const toColor = toPolygonArray[i].fill;
    const toOpacity = toPolygonArray[i].opacity;

    TweenLite.to(path, duration, {
      opacity: toOpacity,
      fill: toColor,
      ease: Power3.easeOut,
    });
  });
}

// add points attribute values to arrays
const updatePolygonArrays = (page, duration) => {
  const paths = document.getElementById('svg-' + page).querySelectorAll('path');

  toPolygonArray = createPathObjects(paths);
  animatePolygons(duration);
  fromPolygonArray = toPolygonArray;
}

