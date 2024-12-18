
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
  offcanvsMenu();
});
  
    function particalsMainFn () {
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
  
      document.querySelectorAll('.has_active--effect').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault()
  
          const targetSection = document.querySelector(this.getAttribute('href'))
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
  
          if (targetSection) {
            const link = this
            removeActiveClass()
            link.classList.add('isActive')
          }
        })
      })
    }
  
    headerActiveEffect()
  
    function speedCtrl () {
      const windowElement = window
  
      const sectionScroll = document.querySelectorAll(
        '.has_scroll--speed__section'
      )
  
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
              if (disableAnimation && window.innerWidth <= disableAnimation)
                return
  
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
  
      const totalWidth = wrapper.scrollWidth
      gsap.to('.wrapper', {
        x: `-${totalWidth / 2}px`,
        repeat: -1,
        duration: 80,
        ease: 'none'
      })
    }
  
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

  