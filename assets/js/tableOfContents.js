const anchors = document.querySelectorAll("nav#TableOfContents ul a")
const headers = document.querySelectorAll(".markdown > h1")
const subheaders = document.querySelectorAll(".markdown > h2")

function findCurrentHeader(headers) {
  let bestHeader = null
  let bestTop = Number.NEGATIVE_INFINITY

  for (const header of headers) {
    const top = header.getBoundingClientRect().top
    if (top < window.innerHeight / 2 && top > bestTop) {
      bestHeader = header
      lowestTop = top
    }
  }

  return bestHeader
}

const observerCallback = () => {
  // Deactivate all anchors
  for (const anchor of anchors) {
    anchor.classList.remove("active")
    const next = anchor.nextElementSibling

    if (next && next.tagName === "UL") {
      next.classList.remove("active")
    }
  }

  const currentHeader = findCurrentHeader(headers)
  if (!currentHeader) { return }

  // Find all H2 tags between current and the next H1
  const subheaders = []
  let sibling = currentHeader.nextElementSibling

  while (sibling && sibling.tagName !== "H1") {
    if (sibling.tagName === "H2") {
      subheaders.push(sibling)
    }
    sibling = sibling.nextElementSibling
  }

  const currentSubheader = findCurrentHeader(subheaders)

  for (const header of [currentHeader, currentSubheader]) {
    if (header != null) {
      const anchor = document.querySelector(`a[href="#${header.id}"]`)
      const next = anchor.nextElementSibling
      
      anchor.classList.add("active")
  
      if (next && next.tagName === "UL") {
        // Hugo generates empty lists for some reason, ignore those
        if (next.children.length > 0 && next.children[0].children.length > 0) {
          next.classList.add("active")
        }
      }
    }
  }
}

const opts = {
	root: null,
	rootMargin: "0px",
}

const observer = new IntersectionObserver(observerCallback, opts)

headers.forEach(header => observer.observe(header))
subheaders.forEach(header => observer.observe(header))
