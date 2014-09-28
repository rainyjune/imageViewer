;(function($){
  $.fn.imageViewer = function(){
    var elements = $(this);
    var scrollTop = 0;
    
    function init() {
      elements.on("click", smallImgClicked);
      $("#imageViewerContainer").on("click", largeImgClicked);
      
    }
    
    function smallImgClicked(e) {
      var thisImg = $(this);
      var smallImgUrl = thisImg.attr("src");
      var largeImgUrl = thisImg.attr("data-largeImgUrl");
      
      scrollTop = $(document).scrollTop().valueOf();
      $("body").addClass("modal-open");

      loadImage(smallImgUrl, largeImgUrl);
      return false;
    }
    
    function largeImgClicked(e) {
      $("body").removeClass("modal-open");
      window.scrollTo(0,scrollTop);
      return false;
      return false;
    }
    
    function loadImage(smallImgUrl, largeimgUrl) {
      var imgElement = $("#largeImg");
      imgElement.attr("src", smallImgUrl);
      $("#loadingBar").show();
      var img = new Image();
      img.onload = function() {
        $("#loadingBar").hide();
        imgElement.attr("src",largeimgUrl);
      };
      setTimeout(function(){
        img.src = largeimgUrl;  
      }, 3000);
      
    }
    
    init();
    return element;
  };
})(jQuery);