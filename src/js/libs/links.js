export default class Links {
   /**
    * Links handler.
    * 1. Open external links in new tab
    * 2. Prevent default for a[href=#]
    * 3. Smooth scroll for anchors
    *
    * @example import Links from "./links";
    * new Links('body', ['.pagination']);
    *
    * @param {String} selector - Where to find links
    * @default "body"
    * @param {Array} exclude - List of selectors to exclude
    * @default []
    */
   constructor(selector = "body", exclude = []) {
      this.container = document.querySelector(selector);

      this.internalLinks = this.container.querySelectorAll('a[href^="/"]');
      this.externalLinks = this.container.querySelectorAll('a[href^="http"]');
      this.anchorLinks = this.container.querySelectorAll('a[href^="#"]');

      this.uri = window.location.pathname;

      this.exclude = exclude;

      if (this.internalLinks) this._internal();
      if (this.externalLinks) this._external();
      if (this.anchorLinks) this._anchor();
   }

   _internal() {
      // Add 'active' class to links
      this.internalLinks.forEach((link) => {
         // Check if link not in exclude
         if (
            link.classList
               .toString()
               .split(/\s/)
               .some((item) => this.exclude.includes(item))
         )
            return;

         let linkUri = link.getAttribute("href").split("?")[0];

         if (
            (this.uri.includes(linkUri) && linkUri !== "/") ||
            linkUri === this.uri
         ) {
            link.classList.add("active");
            // If link has 'li' as a parent element, add 'active' class to 'li' as well
            if (link.parentElement.nodeName === "LI")
               link.parentElement.classList.add("active");
         }
      });
   }

   _external() {
      // Open external links in new tab
      this.externalLinks.forEach((link) => {
         link.setAttribute("target", "_blank");
      });
   }

   _anchor() {
      // Animate anchor links
      this.anchorLinks.forEach((link) => {
         link.addEventListener("click", (e) => {
            e.preventDefault();
            let href = link.getAttribute("href");
            if (href !== "#" && document.querySelector(href)) {
               document
                  .querySelector(href)
                  .scrollIntoView({ behavior: "smooth", block: "start" });
            }
         });
      });
   }
}
