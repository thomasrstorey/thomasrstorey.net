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
    // ...
    return out;
  }

  return self;
}
