module.exports = function () {
  var self = {};

  var nums = ["zero", "one", "two", "three", "four", "five", "six", "seven"];

  self.renderMenu = function (view, menu) {
    var out = '';
    var cols = nums[Math.ceil(12/menu.length)];
    menu.forEach(function(item){
      out += '<div class="'+cols+' columns">';

      if("pages/"+item.href === view){
        out += '<div class="navmenu-item selected">'
           +  '<h5>'+item.name+'</h5>'
           +  '</div>';
      } else {
        out += '<a href="/'+item.href+'"><div class="navmenu-item">'
           +  '<h5>'+item.name+'</h5>'
           +  '</div></a>';
      }
      out += "</div>";
    });
    return out;
  };

  self.renderFooter = function (menu) {
    var out = '';
    menu.forEach(function(item, i, a){
      out += '<a class="footermenu-item" href="/'+item.href+'">'
         +  item.name+'</a>';
      if(i < a.length - 1){
        out += '<span class="footermenu-divider">|</span>';
      }
    });
    return out;
  };

  self.renderColumn = function (pages) {
    var out = '';
    pages.sort(function(a, b){
      return Date.parse(b.date) - Date.parse(a.date);
    });
    pages.forEach(function (page) {
      out += '<div class="category-row"><div class="twelve columns">'
         +  '<a href="/'+page.name+'">'
         + '<div class="category-entry" style="background-image: url(/'
         +  page.thumbnail+');"><div class="category-entry-info">'
         + '<h4 class="category-entry-title">'+page.title+"</h4>"
         + '<p class="category-entry-blurb">'+page.blurb+"</p></div></div>"
         + '</a></div></div>';
    });
    return out;
  };

  self.renderSlideshow = function (images) {
    var out = '<div id="slideshow-container">';
    images.forEach(function (image){
      out += '<div class="slide"><img class="slide-img" src="'+image+'"/>'
         + '</div>';
    });
    return out+'</div><script src="js/slideshow.js" type="text/javascript"></script>';
  };

  return self;
}
