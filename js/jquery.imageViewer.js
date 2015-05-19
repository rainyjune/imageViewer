;(function($){
  $.fn.imageViewer = function(){
    var elements = $(this);
    var scrollTop = 0;
    var imgContainerName = "imageViewerContainer";
    var isOverflowFixNeeded = isAndroidBrowser() && getAndroidVersion() < 3;
    
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
      if (isOverflowFixNeeded) {
        $("body").addClass("overflowFix");
      }

      loadImage(smallImgUrl, largeImgUrl);
      return false;
    }
    
    function largeImgClicked(e) {
      $("body").removeClass("modal-open").removeClass("overflowFix");
      window.scrollTo(0,scrollTop);
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
        if (isOverflowFixNeeded) {
          $("#" + imgContainerName).width(this.width);
        }
      };
        img.src = largeimgUrl;  
      
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
  
  function isAndroidBrowser() {
    var ua = navigator.userAgent;
    // The user agent string of IE mobile v11 on Windows Phone 8.1 contains "Android"
    if (ua.match(/MSIE|Trident/)) {
      return false;
    }
    return (ua.indexOf("Android") >= 0) || (ua.indexOf("android") >= 0);
  }
  
   /**
   * Get 2 digit version of Android
   */
  function getAndroidVersion() {
    var ua = navigator.userAgent;
    return parseFloat(ua.slice(ua.indexOf("Android")+8)).toFixed(1);
  }
})(jQuery);
