function tocItem(anchor) {
  return document.querySelector("[href=\"" + anchor + "\"]")
}

function heading(anchor) {
  return document.querySelector("[id=" + anchor.substr(1) + "]")
}

var _anchors = null
function anchors() {
  if (!_anchors) {
    _anchors = Array.from(document.querySelectorAll("#TableOfContents a"))
        .map(e => e.getAttribute('href'))
  }
  return _anchors
}

function currentAnchor() {
  var bestAnchor = null
  var bestY = null
  anchors().forEach(anchor => {
    var y = heading(anchor).getBoundingClientRect().top
    if (y >= 0 && (!bestAnchor || y < bestY)) {
      bestAnchor = anchor
      bestY = y
    }
  })
  return tocItem(bestAnchor)
}

function update() {
  var selected = document.getElementById("tocSelected")
  var anchor = currentAnchor()
  if (selected) {
    selected.removeAttribute('id')
  }
  if (anchor) {
    anchor.setAttribute('id', 'tocSelected')
  }
}

window.onload = update
window.onscroll = update
