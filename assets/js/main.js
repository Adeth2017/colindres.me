(function() {
  $(function() {
    var $contactLinks, $content, $htmlBody, $knowtifyGallery, $orchidGallery, $scrollTop, $spaceGallery, $tallerMoureGallery;
    $scrollTop = $(".scrollTop");
    $htmlBody = $("html, body");
    $content = $(".content");
    $contactLinks = $(".contact-links .links");
    $knowtifyGallery = $("#knowtify-gallery");
    $tallerMoureGallery = $("#taller-moure-gallery");
    $orchidGallery = $("#orchid-gallery");
    $spaceGallery = $("#space-gallery");
    String.prototype.titleize = function() {
      if (typeof this === "undefined" || this === null) {
        return "";
      }
      return String(this).replace(/(?:^|\s)\S/g, function(c) {
        return c.toUpperCase();
      });
    };
    FastClick.attach(document.body);
    $scrollTop.on("click", function(e) {
      e.preventDefault();
      return $htmlBody.animate({
        scrollTop: 0
      }, 800, "easeInOutCubic");
    });
    $knowtifyGallery.on("click", function(e) {
      e.preventDefault();
      return $.swipebox([
        {
          href: "/assets/img/knowtify/knowtify-desktop.jpg"
        }, {
          href: "/assets/img/knowtify/knowtify-mobile.jpg"
        }, {
          href: "/assets/img/knowtify/knowtify-logomarks.jpg"
        }, {
          href: "/assets/img/knowtify/knowtify-colors.jpg"
        }, {
          href: "/assets/img/knowtify/knowtify-type.jpg"
        }
      ]);
    });
    $orchidGallery.on("click", function(e) {
      e.preventDefault();
      return $.swipebox([
        {
          href: "/assets/img/orchid/orchid-cover.jpg"
        }, {
          href: "/assets/img/orchid/orchid-web.jpg"
        }, {
          href: "/assets/img/orchid/orchid-dashboard.jpg"
        }, {
          href: "/assets/img/orchid/orchid-ipad.jpg"
        }, {
          href: "/assets/img/orchid/orchid-ipad2.jpg"
        }
      ]);
    });
    $tallerMoureGallery.on("click", function(e) {
      e.preventDefault();
      return $.swipebox([
        {
          href: "/assets/img/taller-moure/taller-moure-letter.jpg"
        }, {
          href: "/assets/img/taller-moure/taller-moure-envelope.jpg"
        }, {
          href: "/assets/img/taller-moure/taller-moure-card.jpg"
        }, {
          href: "/assets/img/taller-moure/taller-moure-logomarks.jpg"
        }, {
          href: "/assets/img/taller-moure/taller-moure-colors.jpg"
        }, {
          href: "/assets/img/taller-moure/taller-moure-type.jpg"
        }
      ]);
    });
    $spaceGallery.on("click", function(e) {
      e.preventDefault();
      return $.swipebox([
        {
          href: "/assets/img/space/luna.jpg"
        }
      ]);
    });
    mixpanel.track("Page Viewed", {
      "Page Name": document.title,
      "URL": window.location.pathname
    });
    $content.on("click", ".work-links a", function(e) {
      var linkType, workType;
      workType = $(this).parents(".work-links").data("workType").titleize();
      linkType = $(this).data("workLink").titleize();
      return mixpanel.track("Work Link Clicked", {
        "Work Type": workType,
        "Link Type": linkType
      });
    });
    return $contactLinks.on("click", "a", function(e) {
      var linkType;
      linkType = $(this).last().data("contactLink").titleize();
      return mixpanel.track("Contact Link Clicked", {
        "Link Type": linkType
      });
    });
  });

}).call(this);
