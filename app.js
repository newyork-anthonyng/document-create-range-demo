// Original source code from
// https://jsfiddle.net/abrady0/ggr5mu7o/

function findClickedWord(parentElt, x, y) {
    if (parentElt.nodeName !== '#text') {
        console.log('didn\'t click on text node');
        return null;
    }

    var range = document.createRange();
    var words = parentElt.textContent.split(' ');
    var start = 0;
    var end = 0;
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        end = start+word.length;
        range.setStart(parentElt, start);
        range.setEnd(parentElt, end);

        var rects = range.getClientRects();
        var clickedRect = isClickInRects(rects, x, y);
        if (clickedRect) {
            return [word, start, clickedRect];
        }
        start = end + 1;
    }
    return null;
}

function isClickInRects(rects, x, y) {
    for (var i = 0; i < rects.length; ++i) {
        var currentRect = rects[i]

        if (
            currentRect.left<x &&
            currentRect.right>x &&
            currentRect.top<y &&
            currentRect.bottom>y
        ) {            
            return currentRect;
        }
    }
    return false;
}

var $info = document.getElementById('info');
var $pointer = document.querySelector(".js-pointer");

function onClick(e) {
    var clicked = findClickedWord(e.target.childNodes[0], e.clientX, e.clientY);
    
    if (clicked) {
        var word = clicked[0];
        var r = clicked[2];

        movePointer(r.left, r.top);
        updateInfoContainer(r, word)
    } else {
        $info.innerHTML = 'Nothing Clicked';
    }
}

function updateInfoContainer(rect, word) {
    $info.innerHTML = `
        Clicked: (${rect.top}, ${rect.left}) word: ${word}
    `; 
}

function movePointer(x, y) {
    $pointer.style.left = `${x}px`;
    $pointer.style.top = `${y}px`;
}

document.addEventListener('click', onClick);