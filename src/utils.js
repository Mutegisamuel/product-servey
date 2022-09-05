import questions from "../data/questions.json"
import FeedbackService from "./service/FeedbackService";
import * as views from "./view";

const currentUser = getParameterByName("userId");
const userResponse = {};
const productId = getParameterByName("appId");

const feedbackService = new FeedbackService();

export function setResponse(data){
    userResponse[data.currentIndex] = {
      question: data.question,
      answer: data.answer
    };
  }
  
export function doNext(currentIndex){
    const nextIndex = (currentIndex + 1) % questions.length;
    return nextIndex;
  }
  
export function submitResponse(){
    const feedback = {
      userId: currentUser,
      productId: productId,
      responses: userResponse
    }
    // console.log(feedback);
    feedbackService.createFeedback(feedback);
    views.thanksView();
    setTimeout(() => {
      window.parent.postMessage("_DONE_", "*");      
      window.location.href = `${window.location.origin}`;
    }, 3000);
  }

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
  