$(window).scroll(function () {
    var scroll = $(this).scrollTop();
    if (scroll > 10) {
      $("#navlist0").addClass("affix");
    } else {
      $("#navlist0").removeClass("affix");
    }
  });
  let header = document.querySelector(".topnav");
  let storData = header.offsetTop;
  window.addEventListener("scroll", function (e) {
    if (window.scrollY >= storData) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
  $(".c-year").text(new Date().getFullYear());
  $(document).ready(function () {
    $(".second-button").on("click", function () {
      $(".animated-icon2").toggleClass("open");
    });
  });
  
  // Changes Img to SVG
  $("img.svg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        $img.replaceWith($svg);
      },
      "xml"
    );
  });

  // AOS.init({
  //   duration: 2000,
  //   easing: "ease-in-out",
  //   once: true,
  // });
  // $(window).on("load", function () {
  //   AOS.refresh();
  // });