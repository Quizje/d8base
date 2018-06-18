(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.toggleNav = {
    attach: function(context, settings) {

      $('.navbar-toggler').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-open');
      });
    }
  };
  Drupal.behaviors.toggleFilters = {
    attach: function(context, settings) {
      $('.filters-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).next('form').toggleClass('filters-hide');
      });
    }
  };
  Drupal.behaviors.clickableBlock = {
    attach: function(context, settings) {
      $('.clickable-block').on('click', function(e) {
        e.preventDefault();
        const href = $(this).find('a').attr('href');
        document.location.href = href;
      });
    }
  };
})(jQuery, Drupal);
