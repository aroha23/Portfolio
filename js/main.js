document.addEventListener("DOMContentLoaded", function () {
  /* HEADER SCROLL EFFECT */
  var header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  /* HORIZONTAL & VERTICAL SCROLL CONTROLLER */
  var heroSection = document.querySelector(".hero-section");
  var targetScroll = 0;
  var currentScroll = 0;

  if (heroSection) {
    var speed = 0.35;
    var ease = 0.05;

    window.addEventListener(
      "wheel",
      function (event) {
        var maxScroll = heroSection.scrollWidth - heroSection.clientWidth;

        if (window.scrollY === 0) {
          if (event.deltaY > 0 && targetScroll < maxScroll) {
            event.preventDefault();
            targetScroll += event.deltaY * speed;
            targetScroll = Math.min(targetScroll, maxScroll);
          } else if (event.deltaY < 0 && targetScroll > 0) {
            event.preventDefault();
            targetScroll += event.deltaY * speed;
            targetScroll = Math.max(0, targetScroll);
          }
        }
      },
      { passive: false },
    );

    function smoothScroll() {
      currentScroll += (targetScroll - currentScroll) * ease;
      heroSection.scrollLeft = currentScroll;
      requestAnimationFrame(smoothScroll);
    }

    smoothScroll();
  }

  /* smooth scrolling to page*/
  var homeLink = document.querySelector('a[href="#home"]');

  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault();

    
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      /* Put the horizontal gallery back to the beginning */
      targetScroll = 0;
      currentScroll = 0;
      if (heroSection) {
        heroSection.scrollLeft = 0;
      }
    });
  }

  /* SERVICES TAB INTERACTION (ON CLICK) */
  var serviceItems = document.querySelectorAll(".services-list li");
  var serviceImg = document.querySelector(".services-img");
  var serviceDesc = document.querySelector(".services-description");

  var servicesData = [
    {
      img: "img/Video Production Photo.jpg",
      desc: "FROM ON-SET CINEMATOGRAPHY TO FINAL POST-PRODUCTION, I BUILD VISUAL NARRATIVES THAT CONNECT WITH AUDIENCES. WHETHER IT'S A COMMERCIAL BRAND SPOT, AN ARTISTIC MUSIC VIDEO, OR HIGH-AESTHETIC VERTICAL CONTENT FOR SOCIAL PLATFORMS, I BRIDGE TECHNICAL CAMERA WORK WITH NARRATIVE EDITING.",
    },
    {
      img: "img/Photography .jpg",
      desc: "CAPTURING ATMOSPHERE, EMOTION, AND NARRATIVE DEPTH ACROSS COMMERCIAL, ARTISTIC, AND DOCUMENTARY SPACES. I SPECIALIZE IN PORTRAITURE, LIVE PERFORMING ARTS, PRODUCT LIFESTYLE, AND STREET DOCUMENTARY PHOTOGRAPHY.",
    },
    {
      img: "img/Graphic Design Photo.jpg",
      desc: "BLENDING TYPOGRAPHY, COMPOSITION, AND VISUAL ART TO CREATE COMPELLING PRINT AND DIGITAL MEDIA. I DESIGN PROMOTIONAL POSTERS, KEY ART, MAGAZINE LAYOUTS, AND BRAND ASSETS THAT COMPLEMENT AND ELEVATE COMPLETE AUDIOVISUAL CAMPAIGNS.",
    },
  ];

  if (serviceItems.length > 0 && serviceImg && serviceDesc) {
    serviceItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        if (item.classList.contains("active")) return;

        serviceItems.forEach(function (el) {
          el.classList.remove("active");
        });
        item.classList.add("active");

        serviceImg.src = servicesData[index].img;
        serviceDesc.textContent = servicesData[index].desc;
      });
    });
  }

  /* AUTOMATIC PHOTO SLIDESHOW FOR PROJECTS */
  var slideshows = document.querySelectorAll(".photo-slideshow");

  slideshows.forEach(function (slideshow) {
    var slides = slideshow.querySelectorAll(".slide");
    if (slides.length <= 1) return;
    var currentIndex = 0;

    setInterval(function () {
      slides[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("active");
    }, 3000);
  });
});
