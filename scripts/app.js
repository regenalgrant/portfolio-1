var portfolioPieces = [];

function Piece(arg) {
  this.title = arg.title;
  this.category = arg.category;
  this.url = arg.url;
  this.picture = arg.picture;
  this.description = arg.description;
  this.published = arg.published;
  this.alt = arg.alt;
}

Piece.prototype.toHtml = function(){
  var $newPiece =  $('article.template').clone();
  $newPiece.attr('data-category', this.category);
  $newPiece.find('#title-portfolio-item').text(this.title);
  $newPiece.find('#url-portfolio-item').attr('href', this.url);
  $newPiece.find('#image-portfolio-item').attr('src', this.picture);
  $newPiece.find('#image-portfolio-item').attr('alt', this.alt);
  $newPiece.find('#figcaption-portfolio-item').text(this.description);
  $newPiece.find('time[pubdate]').attr('title', this.published);
  $newPiece.find('time').text('about ' + parseInt((new Date() - new Date(this.published))/60/60/24/1000) + ' days ago');
  $newPiece.removeClass('template');
  $newPiece.addClass('portfolio-pieces');
  return $newPiece;
};

portfolioItems.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.published)) - (new Date(currentObject.published));
});

portfolioItems.forEach(function(ele) {
  portfolioPieces.push(new Piece(ele));
});

portfolioPieces.forEach(function(article) {
  $('#home-top-third').append(article.toHtml());
});
