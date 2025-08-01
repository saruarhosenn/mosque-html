/***************************************************
==================== JS INDEX ======================
****************************************************
01. accordion
02. contac form validation
04. one page nav
05. service details active menu
06. increment dreckment btn
07. Custom Coursor
08. counter up
09. progress bar & circle progress
10. mobile nav a home-showcase dite hobe
11. jarallax
****************************************************/

(function ($) {
  "use strict";

  // preloader
  let preloader = document.querySelector(".preloader");

  function vanishPreloder() {
    preloader.classList.add("disappear");
  }

  // dynamic year
  let dynamicyearElm = $(".dynamic-year");
  if (dynamicyearElm.length) {
    let currentYear = new Date().getFullYear();
    dynamicyearElm.html(currentYear);
  }

  // custom coursor

  // one page menu

  // jarallax
  if ($(".jarallax").length > 0) {
    $(".jarallax").jarallax({
      speed: 0.2,
      imgWidth: 1200,
      imgHeight: 520,
    });
  }

  // counter js
  new PureCounter();
  new PureCounter({
    filesizing: true,
    selector: ".filesizecount",
    pulse: 2,
  });

  if ($(".sticky-header").length) {
    $(".sticky-header")
      .clone()
      .insertAfter(".sticky-header")
      .addClass("sticky-header--cloned");
  }

  // window scroll event
  function stickyMenuUpScroll($targetMenu, $toggleClass) {
    var lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > 500) {
          if (st > lastScrollTop) {
            // downscroll code
            $targetMenu.removeClass($toggleClass);
            // console.log("down");
          } else {
            // upscroll code
            $targetMenu.addClass($toggleClass);
            // console.log("up");
          }
        } else {
          $targetMenu.removeClass($toggleClass);
        }
        lastScrollTop = st;
      },
      false
    );
  }
  stickyMenuUpScroll($(".sticky-header--normal"), "active");

  // mobile menu
  $(".mobile-menu-toggler").on("click", function () {
    $(".mobile-menu__wrapper,.mobile-menu-overlay").addClass("active");
    $("body").addClass("locked");
  });

  $(".mobile-menu__close,.mobile-menu-overlay").on("click", function () {
    $(".mobile-menu__wrapper,.mobile-menu-overlay").removeClass("active");
    $("body").removeClass("locked");
  });

  var $offcanvasNav = $(".mobile-menu__main"),
    $offcanvasNavSubMenu = $offcanvasNav.find(".sub-menu");
  $offcanvasNavSubMenu
    .parent()
    .prepend(
      '<span class="menu-expand"><svg fill="#ffffff" width="17" height="17" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></span>'
    );

  $offcanvasNavSubMenu.slideUp();

  $offcanvasNav.on("click", "li a, li .menu-expand", function (e) {
    var $this = $(this);
    if (
      $this
        .parent()
        .attr("class")
        .match(/\b(dropdown|has-children|has-sub-menu)\b/) &&
      ($this.attr("href") === "#" || $this.hasClass("menu-expand"))
    ) {
      e.preventDefault();
      if ($this.siblings("ul:visible").length) {
        $this.siblings("ul").slideUp("slow");
      } else {
        $this.closest("li").siblings("li").find("ul:visible").slideUp("slow");
        $this.siblings("ul").slideDown("slow");
      }
    }
    if (
      $this.is("a") ||
      $this.is("span") ||
      $this.attr("clas").match(/\b(menu-expand)\b/)
    ) {
      $this.parent().toggleClass("menu-open");
    } else if (
      $this.is("li") &&
      $this.attr("class").match(/\b('dropdown')\b/)
    ) {
      $this.toggleClass("menu-open");
    }
  });

  // aos animation
  AOS.init();

  // odometer
  if ($(".odometer").length) {
    var odo = $(".odometer");
    odo.each(function () {
      $(this).appear(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  // <div class="why-choose-seven__customer__number">
  //   <span class="odometer" data-count="30">00</span>
  //   <span class="why-choose-seven__customer__nuber__count">K</span>
  // </div>

  // owl carousel slider
  function thmOwlInit() {
    let mosqueowlCarousel = $(".mosque-owl__carousel");
    if (mosqueowlCarousel.length) {
      mosqueowlCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
        elm.find("button").each(function () {
          $(this).attr("aria-label", "carousel button");
        });
      });
    }
    let mosqueowlCarouselNav = $(".mosque-owl__carousel--custom-nav");
    if (mosqueowlCarouselNav.length) {
      mosqueowlCarouselNav.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }
    let mosqueowlCarouselCustomDots = $(".mosque-owl__carousel--custom-dots");
    if (mosqueowlCarouselCustomDots.length) {
      mosqueowlCarouselCustomDots.each(function () {
        let elm = $(this);
        let mosqueowlCarouselThumb = elm.data("thumb-elm");
        $(mosqueowlCarouselThumb).each(function () {
          let self = $(this);
          self.find(".owl-dot").on("click", function () {
            elm.trigger("to.owl.carousel", [$(this).index(), 300]);
          });
        });
        elm.on("changed.owl.carousel", function (element) {
          $(mosqueowlCarouselThumb).each(function () {
            let self = $(this);
            self.find(".owl-dot").removeClass("active");
            self.find(".owl-dot").eq(element.item.index).addClass("active");
          });
        });
      });
    }
  }

  // cirle text
  function mosque_cuved_circle() {
    let circleTypeElm = $(".curved-circle--item");
    if (circleTypeElm.length) {
      circleTypeElm.each(function () {
        let elm = $(this);
        let options = elm.data("circle-text-options");
        elm.circleType(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
  }

  // scroll to top
  let scrollTop = $(".scroll-top path");
  if (scrollTop.length) {
    var e = document.querySelector(".scroll-top path"),
      t = e.getTotalLength();
    (e.style.transition = e.style.WebkitTransition = "none"),
      (e.style.strokeDasharray = t + " " + t),
      (e.style.strokeDashoffset = t),
      e.getBoundingClientRect(),
      (e.style.transition = e.style.WebkitTransition =
        "stroke-dashoffset 10ms linear");
    var o = function () {
      var o = $(window).scrollTop(),
        r = $(document).height() - $(window).height(),
        i = t - (o * t) / r;
      e.style.strokeDashoffset = i;
    };
    o(), $(window).scroll(o);
    var back = $(".scroll-top"),
      body = $("body, html");
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > $(window).height()) {
        back.addClass("scroll-top--active");
      } else {
        back.removeClass("scroll-top--active");
      }
    });
  }

  // masonry layout initialization
  function initMasonryLayout() {
    if ($(".masonry-layout").length) {
      $(".masonry-layout").imagesLoaded(function () {
        $(".masonry-layout").isotope({
          layoutMode: "masonry",
        });
      });
    }
  }

  // fitRows layout initialization
  function initFitRowLayout() {
    if ($(".fitRow-layout").length) {
      $(".fitRow-layout").imagesLoaded(function () {
        $(".fitRow-layout").isotope({
          layoutMode: "fitRows",
        });
      });
    }
  }

  // filter layout initialization
  function initPostFilter() {
    if ($(".post-filter").length) {
      var postFilterList = $(".post-filter li");

      // initial filter setup
      $(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false,
        },
      });

      // on click filter items
      postFilterList.on("click", function () {
        var selector = $(this).attr("data-filter");
        postFilterList.removeClass("active");
        $(this).addClass("active");

        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    }
  }

  // initialize all functions
  function initMasonry() {
    initMasonryLayout();
    initFitRowLayout();
    initPostFilter();
  }

  // magnificPopup img view
  $(".image-popup").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  // magnificPopup video view
  $(".video-popup").magnificPopup({
    type: "iframe",
  });

  // window load event
  $(window).on("load", function () {
    vanishPreloder();
    thmOwlInit();
    initMasonry();
    mosque_cuved_circle();
  });

  // window scroll event
  $(window).on("scroll", function () {
    // scroll to top
    var scrollToTopBtn = ".scroll-to-top";
    if (scrollToTopBtn.length) {
      if ($(window).scrollTop() > 500) {
        $(scrollToTopBtn).addClass("show");
      } else {
        $(scrollToTopBtn).removeClass("show");
      }
    }
  });
})(jQuery);
