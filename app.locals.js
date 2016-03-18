module.exports = function (app) {
  app.locals.title = "Thomas R. Storey | Artist & Web/Mobile Developer";
  app.locals.url = "http://localhost:2197";
  app.locals.author = "Thomas R. Storey";
  app.locals.menu = [
        {name: "About", href: "about"},
        {name: "Contact", href: "contact"},
        {name: "Resume/CV", href: "resume-cv"}
      ];
};
