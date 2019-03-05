import TweenLite from 'gsap/TweenLite';
import $ from 'jquery';

class Masthead {
  constructor() {

    // Configurable Vars
    this.$masthead = $('#masthead');
    this.minOpacity = 0.4;

    // Automatically defined vars
    this.scrolled = false;

    // Method bindings

    this.getInitialPagePosition();

    window.addEventListener("scroll", this._onPageScroll, {passive: true});
  }

  /**
   * See how far the user has scrolled on page load
   */
  getInitialPagePosition = () => {
    let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

    this.minifyMasthead(scrollTop);
  };

  _onPageScroll = evt => {
    this.minifyMasthead(evt.pageY);
  };

  minifyMasthead = amntScrolled => {

    let opacity = amntScrolled / 600;

    if ( opacity < this.minOpacity ){
      opacity = this.minOpacity;
    }

    // Set the opacity of the masthead background depending on scroll distance (but don't go much further than 1!)
    if ( opacity <= 1.1) {
      this.tween = TweenLite.to(this.$masthead.find('.background'), 1, {opacity: opacity});
    }
  };


}

export default Masthead;