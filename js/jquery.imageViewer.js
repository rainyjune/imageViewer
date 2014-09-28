;(function($){
  $.fn.imageViewer = function(){
    var elements = $(this);
    var scrollTop = 0;
    var imgContainerName = "imageViewerContainer";
    
    function init() {
      buildImageViewerContainer();
      elements.on("click", smallImgClicked);
      $("#" + imgContainerName).on("click", largeImgClicked);
      
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
      //setTimeout(function(){
        img.src = largeimgUrl;  
      //}, 3000);
      
    }
    
    /**
     *
     *<div id="imageViewerContainer">
        <div class="contentContainer">
          <img id="largeImg" src="" alt="pic1" />
          <p id="loadingBar" style="">
            <img src="images/loading-animation-8.gif" alt="">
          </p>
        </div>
        
    </div>
     **/
    
    function buildImageViewerContainer() {
      if($("#" + imgContainerName).length == 0){
        var viewerContainer = $('<div id="imageViewerContainer"></div>');
        var contentContainer = $('<div class="contentContainer">');
        var largeImg = $('<img id="largeImg" src="" alt="pic1" />');
        var loadingBar = $('<p id="loadingBar" style=""><img src="images/loading-animation-8.gif" alt=""></p>');
        contentContainer.append(largeImg);
        contentContainer.append(loadingBar);
        viewerContainer.append(contentContainer);
        $("body").prepend(viewerContainer);
      }
    }
    
    init();
    return elements;
  };
})(jQuery);