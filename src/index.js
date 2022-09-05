import * as views from "./view";
import * as utils from "./utils";
import ProductService from "./service/ProductService";
import FeedbackService from "./service/FeedbackService";

let currentIndex = 0;
const currentUser = utils.getParameterByName("userId");
const productId = utils.getParameterByName("appId");

views.homeView();

if(!hasClosed()){
  productCheck();

  const closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener('click', function(e){
    e.preventDefault();    
  });      

  let closeCounter = 5;
  const toCloseIntervalId = setInterval(()=>{
    closeCounter--;
    closeBtn.innerHTML = closeCounter;
  }, 1000);
  setTimeout(()=>{
    clearInterval(toCloseIntervalId);
    closeBtn.innerHTML = "Close";
    closeBtn.addEventListener('click', function(e){
      e.preventDefault();    
      window.parent.postMessage("_CLOSE_", "*");
      window.location.href = `${window.location.origin}`;
      views.homeView();
    });    
  }, 5000);

}

function productCheck(){
  const productService = new ProductService();
  productService.getProduct(productId, function(data) {
    if(data !== null && currentUser){
      views.renderView(currentIndex);  
    } else {
      views.homeView();  
    }
  });
}

function showFeedbacks(){
  const feedbackService = new FeedbackService();
  feedbackService.getFeedbacks();
}

function hasClosed(){
  return window.location.href.toLocaleLowerCase().indexOf("#close") > -1
}