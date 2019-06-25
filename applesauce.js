const BLACKLIST_WORDS = ["bacon", "meatball"];

const $textElement = document.querySelector(".parent");
function applesauce() {
    let $textNode;

    for (let i = 0; i < $textElement.childNodes.length; i++) {
        const currentChildNode = $textElement.childNodes[i];

        if (currentChildNode.nodeName === "#text") {
            $textNode = currentChildNode;
            break;
        }
    }

    if ($textNode === undefined) {
        return;
    }
    // split text into an array
    const textArray = $textNode.textContent.split(" ");
    let index = 0;

    // iterate through array
    for (let i = 0; i < textArray.length; i++) {
        const currentWord = textArray[i];

        // see if element matches a blacklist word

        if (BLACKLIST_WORDS.includes(currentWord.toLowerCase())) {
            // if element does match, create a range for it
            let start = index;
            let end = start + currentWord.length;

            const range = document.createRange();
            range.setStart($textNode, start);
            range.setEnd($textNode, end);

            // use the range's client rect and highlight it
            const clientRects = range.getClientRects();
            const $highlight = document.createElement("div");
            $highlight.classList.add("highlight");
            $highlight.style.position = "absolute";
            $highlight.style.left = `${clientRects[0].left}px`;
            $highlight.style.top = `${clientRects[0].top}px`;
            document.body.appendChild($highlight);
        }

        index += currentWord.length + 1;
    }
}

applesauce();