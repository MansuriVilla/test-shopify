const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add(time => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

function offcanvsMenu () {
  const menuToggle = document.querySelector('.menu-toggle')
  const offCanvasMenu = document.querySelector('.off-canvas-menu')
  const menu = document.querySelector('.menu')
  const ctaMain = document.querySelector('.cta_main')
  const menuClose = document.querySelector('.menu-close')
  const header = document.querySelector('.header')

  function setFullHeight () {
    if (window.innerWidth <= 768) {
      const viewportHeight = window.innerHeight
      offCanvasMenu.style.height = `${viewportHeight}px`
    }
  }

  setFullHeight()

  window.addEventListener('resize', () => {
    setFullHeight()
    moveMenuAndCtaToOffCanvas()
  })

  function moveMenuAndCtaToOffCanvas () {
    if (window.innerWidth <= 768) {
      if (!offCanvasMenu.contains(menu)) {
        offCanvasMenu.appendChild(menu)
      }
      if (!offCanvasMenu.contains(ctaMain)) {
        offCanvasMenu.appendChild(ctaMain)
      }
    } else {
      const headerNavigationsLinks = document.querySelector(
        '.header_navigations_links'
      )
      if (!headerNavigationsLinks.contains(menu)) {
        headerNavigationsLinks.appendChild(menu)
      }
      if (!headerNavigationsLinks.contains(ctaMain)) {
        headerNavigationsLinks.appendChild(ctaMain)
      }
    }
  }

  moveMenuAndCtaToOffCanvas()

  menuToggle.addEventListener('click', () => {
    offCanvasMenu.classList.add('active')
    header.classList.add('menu-active')
    setFullHeight()
  })

  menuClose.addEventListener('click', () => {
    offCanvasMenu.classList.remove('active')
    header.classList.remove('menu-active')
  })

  document.addEventListener('click', e => {
    if (!offCanvasMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      offCanvasMenu.classList.remove('active')
      header.classList.remove('menu-active')
    }
  })

  const menuItems = offCanvasMenu.querySelectorAll('.header_nav_links')
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      offCanvasMenu.classList.remove('active')
      header.classList.remove('menu-active')
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  offcanvsMenu()
})

function particalsMainFn () {
  // Check if the 'Home' element exists on the page
  if (document.getElementById('Home')) {
    particlesJS('Home', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#fff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#fff'
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#fff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'body',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    })
  }
}

particalsMainFn()

gsap.registerPlugin(ScrollTrigger)
gsap.to('.header', {
  scrollTrigger: {
    trigger: '.site_top--area',
    markers: false,
    start: '40% 20%',
    end: 'bottom bottom',
    scrub: true,
    onEnter: () => {
      document.querySelector('.header').classList.add('scrolled')
    },
    onLeaveBack: () => {
      document.querySelector('.header').classList.remove('scrolled')
    }
  },
  backgroundColor: '#00000030',
  backdropFilter: 'blur(30px)',
  width: () => (window.innerWidth <= 1024 ? '90%' : '60%'),
  y: '20px',
  borderRadius: '50px',
  ease: 'none'
})

function headerActiveEffect () {
  const sections = document.querySelectorAll('section')
  const navLinks = document.querySelectorAll('.has_active--effect')

  function removeActiveClass () {
    navLinks.forEach(link => {
      link.classList.remove('isActive')
    })
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.25
  }

  const observerCallback = entries => {
    entries.forEach(entry => {
      const sectionId = entry.target.id
      const link = document.querySelector(
        `.has_active--effect[href="#${sectionId}"]`
      )

      if (entry.isIntersecting) {
        removeActiveClass()
        if (link) {
          link.classList.add('isActive')
        }
      } else {
        if (link) {
          link.classList.remove('isActive')
        }
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, options)

  sections.forEach(section => {
    observer.observe(section)
  })

  // Function to remove active class from all navigation links
  function removeActiveClass () {
    document.querySelectorAll('.has_active--effect').forEach(link => {
      link.classList.remove('isActive')
    })
  }

  // Handle link clicks for smooth scrolling or navigation to index.html
  document.querySelectorAll('.has_active--effect').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      const isSamePage = href.startsWith('#') // Check if it's a same-page link
      const isIndexPageLink = href.includes('index.html')

      if (isSamePage || isIndexPageLink) {
        e.preventDefault() // Prevent default navigation

        if (isSamePage) {
          // Same-page navigation
          const targetId = href.substring(1)
          const targetSection = document.getElementById(targetId)

          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })

            // Add active class
            removeActiveClass()
            this.classList.add('isActive')
          }
        } else {
          // Navigate to index.html with hash and ensure smooth scroll
          const targetURL = href
          window.location.href = targetURL

          // Wait for the page to load and then scroll smoothly to the target section
          window.addEventListener('load', function () {
            const targetHash = window.location.hash
            if (targetHash) {
              const targetSection = document.querySelector(targetHash)
              if (targetSection) {
                targetSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }
            }
          })
        }
      }
    })
  })

  // Handle hash-based scrolling on index.html page load
  document.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash

    if (hash) {
      const targetSection = document.querySelector(hash)
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  })
}

headerActiveEffect()

function speedCtrl () {
  const windowElement = window

  const sectionScroll = document.querySelectorAll('.has_scroll--speed__section')

  let isScrolling = false

  function checkSectionInView (section) {
    const sectionTop = section.getBoundingClientRect().top
    const sectionBottom = section.getBoundingClientRect().bottom
    const viewportHeight = window.innerHeight

    return sectionTop <= viewportHeight && sectionBottom >= 0
  }

  function onScroll () {
    sectionScroll.forEach(function (section) {
      const isInView = checkSectionInView(section)

      if (isInView && !section.classList.contains('is_view')) {
        section.classList.add('is_view')
      }

      if (!isInView && section.classList.contains('is_view')) {
        section.classList.remove('is_view')
      }

      if (section.classList.contains('is_view')) {
        const sectionTop = section.getBoundingClientRect().top

        const disableWidth = section.getAttribute(
          'data-disable-scroll-animation'
        )
        const disableAnimation = disableWidth
          ? parseInt(disableWidth, 10)
          : null

        const boxData = Array.from(
          section.querySelectorAll('.has_scroll--speed__element')
        ).map(function (box) {
          const scrollSpeed =
            parseFloat(box.getAttribute('data-scroll-speed')) || 1
          return {
            el: box,
            scrollSpeed: scrollSpeed
          }
        })

        boxData.forEach(function (data) {
          if (disableAnimation && window.innerWidth <= disableAnimation) return

          const relativeScroll = sectionTop - windowElement.innerHeight
          const scrollFactor = relativeScroll / data.scrollSpeed

          data.el.style.transform = `translateY(${scrollFactor}px)`
        })
      }
    })

    isScrolling = false
  }

  windowElement.addEventListener('scroll', function () {
    if (!isScrolling) {
      isScrolling = true
      requestAnimationFrame(onScroll)
    }
  })
}

speedCtrl()

window.onload = function () {
  const wrapper = document.querySelector('.wrapper')
  const textItems = document.querySelectorAll('.text-item')

  const duplicateItems = () => {
    const itemsArray = Array.from(textItems)
    itemsArray.forEach(item => {
      const clone = item.cloneNode(true)
      wrapper.appendChild(clone)
    })
  }

  duplicateItems()

  function animateWrapper () {
    const wrapper = document.querySelector('.wrapper')
    if (wrapper) {
      const totalWidth = wrapper.scrollWidth
      gsap.to('.wrapper', {
        x: `-${totalWidth / 2}px`,
        repeat: -1,
        duration: 80,
        ease: 'none'
      })
    }
  }

  animateWrapper()

  document.querySelectorAll('.right-box').forEach(function (box) {
    gsap.to(box, {
      backgroundColor: '#000',
      color: '#AEDEE0',
      duration: 1,
      scrollTrigger: {
        trigger: box,
        start: '0% 78%',
        end: '100% 78%',
        markers: false,
        scrub: true
      }
    })
  })

  document.getElementById('year').textContent = new Date().getFullYear()
}

const form = document.querySelector('form')

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault() // Prevent form submission for validation

    // Clear previous error messages
    document.querySelectorAll('.error-msg').forEach(msg => msg.remove())

    let isValid = true

    // Validation rules for each input
    const inputs = [
      { id: 'name', message: 'Name is required.' },
      { id: 'phone', message: 'Phone number must be valid.' },
      { id: 'email', message: 'Email is required and must be valid.' },
      { id: 'company', message: 'Company name is required.' }
      // Skip validation for the 'idea' field since it's optional
    ]

    inputs.forEach(({ id, message }) => {
      const input = document.getElementById(id)

      if (!validateField(input)) {
        isValid = false
        showError(input, message)
      }
    })

    if (isValid) {
      alert('Form submitted successfully!')
    }
  })
}

// Helper function to validate fields (example implementation)
function validateField (input) {
  if (!input || input.value.trim() === '') {
    return false
  }
  // Additional validation logic (e.g., regex for email or phone) can be added here
  return true
}

// Helper function to show error messages
function showError (input, message) {
  if (!input) return

  const error = document.createElement('div')
  error.className = 'error-msg'
  error.textContent = message
  input.parentElement.appendChild(error)
}

function validateField (input) {
  if (input.id === 'phone') {
    // Validate phone number (allowing only digits and ensuring it's not empty)
    return /^\d+$/.test(input.value.trim()) && input.value.trim() !== ''
  } else if (input.type === 'email') {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(input.value.trim())
  } else {
    // General required field validation
    return input.value.trim() !== ''
  }
}

function showError (input, message) {
  const errorMsg = document.createElement('div')
  errorMsg.className = 'error-msg'
  errorMsg.textContent = message
  errorMsg.style.color = 'red'
  errorMsg.style.fontSize = '0.85rem'
  errorMsg.style.marginTop = '5px'

  input.parentNode.appendChild(errorMsg)
}

// Prevent up/down keys from incrementing/decrementing the phone number input
const phoneInput = document.getElementById('phone')
if (phoneInput) {
  phoneInput.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
    }
  })
}

document.querySelectorAll('.has_magnatic--effect').forEach(button => {
  button.addEventListener('mousemove', e => {
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Apply the magnetic effect with scale
    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.1)`
    button.classList.add('is_magnatic--effect')
  })

  button.addEventListener('mouseleave', () => {
    // Reset the button position with a smooth transition
    button.style.transform = `translate(0, 0) scale(1)`
    button.classList.remove('is_magnatic--effect')
  })
})
