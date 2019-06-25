const BLACKLIST_WORDS = ["bacon", "meatball"];

const $textElement = document.querySelector(".parent");
function applesauce() {
    let $textNodes = [];

    for (let i = 0; i < $textElement.childNodes.length; i++) {
        const currentChildNode = $textElement.childNodes[i];

        if (currentChildNode.nodeName === "#text") {
            $textNodes.push(currentChildNode);
        }
    }

    if ($textNodes.length === 0) {
        return;
    }

    $textNodes.forEach(highlightTextForNode);
}

function highlightTextForNode($node) {
    const textArray = $node.textContent.split(" ");
    let index = 0;

    for (let i = 0; i < textArray.length; i++) {
        const currentWord = textArray[i];

        if (isBlacklist(currentWord)) {
            const start = index;
            const end = start + currentWord.length;
            const clientRects = getClientRectsForRange($node, start, end);
            renderWordHighlight(clientRects);
        }

        index += currentWord.length + 1;
    }
}

function getClientRectsForRange($node, start, end) {
    const range = document.createRange();
    range.setStart($node, start);
    range.setEnd($node, end);
    return range.getClientRects();
}

function isBlacklist(word) {
    return BLACKLIST_WORDS.includes(word.toLowerCase());
}

function renderWordHighlight(clientRects) {
    const $highlight = document.createElement("div");
    $highlight.classList.add("highlight");
    $highlight.style.position = "absolute";
    $highlight.style.left = `${clientRects[0].left}px`;
    $highlight.style.top = `${clientRects[0].top}px`;
    document.body.appendChild($highlight);
}

applesauce();