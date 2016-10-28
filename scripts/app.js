var portfolioPieces = [];

function Piece(arg) {
  this.title = arg.title;
  this.category = arg.category;
  this.url = arg.url;
  this.picture = arg.picture;
  this.description = arg.description;
  this.published = arg.published;
  this.alt = arg.alt;
  this.body = arg.body;
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
  $newPiece.find('#body-portfolio-item').html(this.body);
  $newPiece.removeClass('template');
  $newPiece.addClass('portfolio-pieces');
  return $newPiece;
};

portfolioPieces.handleMainNav = function () {
  $('.header-menu').on('click', '.contentBtn', function() {
    $('.contentBtn-content').hide();
    var $idContent = $(this).data().content;
    console.log($idContent, 'id Content');
    $('#' + $idContent).fadeIn();
    $idContent = '';
  });
  // $('.main-nav .tab:first').click();
};

portfolioPieces.setTeasers = function() {

  $('#body-portfolio-item :only-child').hide();

  $('.read-on').on('click', function(event){
    console.log('clicked: ', $(this).text());
    event.preventDefault();
    if($(this).html() === 'Show More →'){
      $(this).parent().find('*').show();
      $(this).text('Show Less');
      console.log('I should show more now');
    } else {
      $(this).text('Show More →');
      $(this).prev('p').children().hide();
      console.log('I should show less now');
    };
  });
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

portfolioPieces.handleMainNav();
portfolioPieces.setTeasers();
