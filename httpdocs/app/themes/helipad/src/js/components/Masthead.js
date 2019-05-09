
class Masthead {
  constructor() {

    // Configurable Vars

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

  };

  _onPageScroll = evt => {


  };



}

export default Masthead;