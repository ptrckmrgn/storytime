let toPolygonArray = [];
let fromPolygonArray = [];

// Get points of the paths using regex
const getCoordinates = (path) => {
    return path.getAttribute('d').match(/M(-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)L(-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)L(-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)Z/);
};

// Go through the SVG element and create objects for each path
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

// Animates each polygon from the former state to the next
const animatePolygons = (duration) => {
    const paths = document.querySelector('#svg-holder').querySelectorAll('path');

    fromPolygonArray = createPathObjects(paths);

    // Animate movement
    fromPolygonArray.forEach((obj, i) => {
        TweenMax.to(obj, duration, {
            one: toPolygonArray[i].one,
            two: toPolygonArray[i].two,
            three: toPolygonArray[i].three,
            four: toPolygonArray[i].four,
            five: toPolygonArray[i].five,
            six: toPolygonArray[i].six,
            ease: Power2.easeOut,
            onUpdate: () => {
                paths[i].setAttribute("d", `M${obj.one},${obj.two}L${obj.three},${obj.four}L${obj.five},${obj.six}Z`);
            }
        });
    });

    // Animate color
    paths.forEach((path, i) => {
        const toColor = toPolygonArray[i].fill;
        const toOpacity = toPolygonArray[i].opacity;

        TweenLite.to(path, duration, {
            opacity: toOpacity,
            fill: toColor,
            ease: Power2.easeOut
        });
    });
}

// Add points attribute values to arrays
const updatePolygonArrays = (page, duration) => {
    const paths = document.getElementById('svg-' + page).querySelectorAll('path');

    toPolygonArray = createPathObjects(paths);
    animatePolygons(duration);
    fromPolygonArray = toPolygonArray;
}
