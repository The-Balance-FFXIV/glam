const anchors = document.querySelectorAll("nav#TableOfContents ul a")
// Look for both direct children and any h1/h2 within .markdown for broader compatibility
const headers = document.querySelectorAll(".markdown h1, .markdown > h1")
const subheaders = document.querySelectorAll(".markdown h2, .markdown > h2")

// TOC Toggle functionality
const tocToggle = document.getElementById('toc-toggle')
const tocNav = document.getElementById('TableOfContents')
const expandIcon = document.getElementById('toc-expand-icon')
const collapseIcon = document.getElementById('toc-collapse-icon')
const tocContainer = document.querySelector('.table-of-contents-container')

function collapseTOC() {
  if (tocNav && tocNav.classList.contains('toc-expanded')) {
    tocNav.classList.remove('toc-expanded')
    if (expandIcon && collapseIcon) {
      expandIcon.classList.remove('hidden')
      collapseIcon.classList.add('hidden')
    }
    if (tocToggle) {
      tocToggle.setAttribute('aria-expanded', 'false')
    }
  }
}

function expandTOC() {
  if (tocNav && !tocNav.classList.contains('toc-expanded')) {
    tocNav.classList.add('toc-expanded')
    if (expandIcon && collapseIcon) {
      expandIcon.classList.add('hidden')
      collapseIcon.classList.remove('hidden')
    }
    if (tocToggle) {
      tocToggle.setAttribute('aria-expanded', 'true')
    }
  }
}

if (tocToggle && tocNav) {
  tocToggle.addEventListener('click', function(e) {
    e.stopPropagation()
    const isExpanded = tocNav.classList.contains('toc-expanded')
    
    if (isExpanded) {
      collapseTOC()
    } else {
      expandTOC()
    }
  })
  
  // Set initial aria-expanded state
  tocToggle.setAttribute('aria-expanded', 'false')
  
  // Handle window resize - reset TOC state on large screens
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
      // Reset TOC state on large screens
      if (tocNav.classList.contains('toc-expanded')) {
        collapseTOC()
      }
    }
  })
}

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
    anchor.classList.remove("parent-active")
    const next = anchor.nextElementSibling

    if (next && next.tagName === "UL") {
      next.classList.remove("active")
    }
  }

  // For BIS pages, we only have h2 elements, so treat them as main headers
  const allHeaders = headers.length > 0 ? headers : subheaders
  const currentHeader = findCurrentHeader(allHeaders)
  
  // If no header is found in the optimal position, default to the first one
  const activeHeader = currentHeader || allHeaders[0]
  if (!activeHeader) { return }

  let currentSubheader = null
  
  // Only look for subheaders if we have actual h1 headers (not BIS pages) and a current header was found
  if (headers.length > 0 && currentHeader) {
    // Find all H2 tags between current and the next H1
    const subheadersInSection = []
    let sibling = currentHeader.nextElementSibling

    while (sibling && sibling.tagName !== "H1") {
      if (sibling.tagName === "H2") {
        subheadersInSection.push(sibling)
      }
      sibling = sibling.nextElementSibling
    }

    currentSubheader = findCurrentHeader(subheadersInSection)
  }

  for (const header of [activeHeader, currentSubheader]) {
    if (header != null) {
      const anchor = document.querySelector(`a[href="#${header.id}"]`)
      if (!anchor) continue // Skip if anchor not found
      
      const next = anchor.nextElementSibling
      
      anchor.classList.add("active")
      
      // Also mark parent links as active for mobile view
      let parentLi = anchor.closest('li').parentElement?.closest('li')
      while (parentLi) {
        const parentAnchor = parentLi.querySelector('a')
        if (parentAnchor) {
          parentAnchor.classList.add("parent-active")
        }
        parentLi = parentLi.parentElement?.closest('li')
      }
  
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

// Observe all headers found
headers.forEach(header => observer.observe(header))
subheaders.forEach(header => observer.observe(header))

// Function to set the first header as active
function setFirstHeaderActive() {
  // Check if sentinel exists and is out of view (TOC is stuck)
  const sentinel = document.querySelector('[data-toc-sentinel]')
  if (sentinel) {
    const sentinelRect = sentinel.getBoundingClientRect()
    // If sentinel is above viewport (out of view), don't set first header as active
    // Let the normal scroll detection handle it
    if (sentinelRect.bottom < 0) {
      return
    }
  }

  // For BIS pages, we only have h2 elements, so treat them as main headers
  const allHeaders = headers.length > 0 ? headers : subheaders
  
  if (allHeaders.length > 0) {
    const firstHeader = allHeaders[0]
    const firstAnchor = document.querySelector(`a[href="#${firstHeader.id}"]`)
    
    if (firstAnchor) {
      firstAnchor.classList.add("active")
      
      // Also handle nested UL if it exists
      const next = firstAnchor.nextElementSibling
      if (next && next.tagName === "UL") {
        if (next.children.length > 0 && next.children[0].children.length > 0) {
          next.classList.add("active")
        }
      }
    }
  }
}

// Set first header as active on page load - but delay to allow sentinel setup
document.addEventListener('DOMContentLoaded', function() {
  // Delay to ensure sentinel is created first
  setTimeout(setFirstHeaderActive, 150)
})

// Also set it after a longer delay to ensure all content is loaded
setTimeout(setFirstHeaderActive, 250)

// Sticky state detection for TOC
function setupStickyDetection() {
  const tocContainer = document.querySelector('.table-of-contents-container')
  if (!tocContainer) return

  // Get the computed style to find the actual top value
  const computedStyle = window.getComputedStyle(tocContainer)
  const topValue = computedStyle.top
  
  // Create a sentinel element positioned just above where the TOC would stick
  const sentinel = document.createElement('div')
  sentinel.style.position = 'absolute'
  sentinel.style.top = '0'
  sentinel.style.height = '1px'
  sentinel.style.width = '100%'
  sentinel.style.opacity = '0'
  sentinel.style.pointerEvents = 'none'
  sentinel.setAttribute('data-toc-sentinel', '')
  
  // Insert the sentinel at the top of the TOC container's parent
  const tocParent = tocContainer.parentNode
  tocParent.style.position = 'relative' // Ensure parent has relative positioning
  tocParent.insertBefore(sentinel, tocContainer)

  let isStuck = false

  function checkStickyState() {
    const tocRect = tocContainer.getBoundingClientRect()
    const sentinelRect = sentinel.getBoundingClientRect()
    
    // Parse the top value to get the offset where TOC should stick
    const topOffset = parseInt(topValue) || 32
    
    // TOC is stuck when:
    // 1. Its top position is at or near the sticky offset
    // 2. The sentinel is above the viewport
    const shouldBeStuck = tocRect.top <= topOffset + 5 && sentinelRect.bottom < 0
    
    if (shouldBeStuck && !isStuck) {
      tocContainer.classList.add('is-stuck')
      isStuck = true
    } else if (!shouldBeStuck && isStuck) {
      tocContainer.classList.remove('is-stuck')
      isStuck = false
    }
  }

  // Use requestAnimationFrame for smooth detection
  function onScroll() {
    requestAnimationFrame(checkStickyState)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  
  // Initial check
  checkStickyState()
}

// Initialize sticky detection after DOM is loaded
document.addEventListener('DOMContentLoaded', setupStickyDetection)
