var pins = document.getElementsByClassName('pin');
var mean = document.getElementById('mean');

var dragging = null;

for (var i = 0; i < pins.length; i++) {
    pins[i].__data__ = Math.random();
    pins[i].onmousedown = (function(i) {
        return function(e) {
            dragging = i;
        };
    })(i);
};

function draw() {
    var d = [];
    for (var i = 0; i < pins.length; i++) {
        pins[i].style.left =  (pins[i].__data__ * 610) + 'px';
        d.push(pins[i].__data__);
    }
    mean.style.left = (ss.mean(d) * 610) + 'px';
    median.style.left = (ss.median(d) * 610) + 'px';
    dev.style.left = (ss.standard_deviation(d) * 610) + 'px';
}

draw();

document.onselectstart = function() {
  return false;
};

document.onmouseup = function() {
    dragging = null;
};

document.onmousemove = function(e) {
    if (dragging !== null) {
        pins[dragging].__data__ =
        Math.min(
            Math.max((e.screenX - 20) / 640, 0),
            1);
        draw();
    }
};
