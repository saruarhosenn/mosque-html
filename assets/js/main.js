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

  // magnificPopup video view
  if ($(".video-popup").length) {
    $(".video-popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,

      fixedContentPos: false,
    });
  }

  // magnificPopup img view
  if ($(".img-popup").length) {
    var groups = {};
    $(".img-popup").each(function () {
      var id = parseInt($(this).attr("data-group"), 10);

      if (!groups[id]) {
        groups[id] = [];
      }

      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true,
        },
      });
    });
  }

  // sticky header
  if ($(".sticky-header").length) {
    $(".sticky-header")
      .clone()
      .insertAfter(".sticky-header")
      .addClass("sticky-header--cloned");
  }

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

  // wow animation
  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  /* member card */
  $(".member-card__btn").on("mouseenter", function () {
    const $parentCard = $(this).closest(".member-card");
    const $socialLinks = $parentCard.find(".social-links");

    $(".member-card__btn").removeClass("active");
    $(".member-card").removeClass("active");
    $(".social-links").css({
      opacity: "",
      transform: "",
    });

    $(this).addClass("active");
    $parentCard.addClass("active");
    $socialLinks.css({
      opacity: "1",
      transform: "translateX(-50%) translateY(0%)",
    });
  });

  $(".member-card").on("mouseleave", function () {
    $(".member-card__btn").removeClass("active");
    $(".member-card").removeClass("active");
    $(".social-links").css({
      opacity: "",
      transform: "",
    });
  });

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

  //fact counter + text count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text(),
          }).animate(
            {
              countNum: n,
            },
            {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              },
            }
          );
        }
      },
      {
        accY: 0,
      }
    );
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

  // window load event
  $(window).on("load", function () {
    vanishPreloder();
    thmOwlInit();
    initMasonry();

    if ($(".circle-progress").length) {
      $(".circle-progress").appear(function () {
        $(".circle-progress").each(function () {
          let progress = $(this);
          let progressOptions = progress.data("options");
          progress.circleProgress(progressOptions);
          progress.data("original-options", progressOptions);
        });
      });
    }
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
