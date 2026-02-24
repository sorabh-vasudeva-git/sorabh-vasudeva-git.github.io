document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var navbar = document.getElementById('navbar');

  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  var navAnchors = links.querySelectorAll('a');
  navAnchors.forEach(function (anchor) {
    anchor.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  var sections = document.querySelectorAll('.section, .hero');
  var navItems = document.querySelectorAll('.nav-links a');

  var lastScroll = 0;
  function onScroll() {
    var scrollPos = window.scrollY;

    if (scrollPos > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    var activePos = scrollPos + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (activePos >= top && activePos < top + height) {
        navItems.forEach(function (item) {
          item.classList.remove('active');
          if (item.getAttribute('href') === '#' + id) {
            item.classList.add('active');
          }
        });
      }
    });

    lastScroll = scrollPos;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  var fadeUpElements = document.querySelectorAll(
    '.timeline-item, .ai-card, .insight-card, .pillar-item'
  );
  fadeUpElements.forEach(function (el, i) {
    el.classList.add('fade-in');
    el.style.transitionDelay = (i % 5) * 0.08 + 's';
    observer.observe(el);
  });

  var scaleElements = document.querySelectorAll(
    '.achievement-card, .cert-card'
  );
  scaleElements.forEach(function (el, i) {
    el.classList.add('scale-in');
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
    observer.observe(el);
  });

  var expertiseCards = document.querySelectorAll('.expertise-card');
  expertiseCards.forEach(function (el, i) {
    el.classList.add(i % 2 === 0 ? 'fade-in-left' : 'fade-in-right');
    observer.observe(el);
  });

  var contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(function (el, i) {
    el.classList.add('fade-in');
    el.style.transitionDelay = i * 0.12 + 's';
    observer.observe(el);
  });

  var sectionTitles = document.querySelectorAll('.section-title, .section-subtitle');
  sectionTitles.forEach(function (el) {
    observer.observe(el);
  });
});
