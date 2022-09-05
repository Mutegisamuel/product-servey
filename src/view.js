import questions from "../data/questions.json"
import * as constants from "./constants";
import * as event from "./event";
import ProductService from "./service/ProductService";
import images from "../assets/images/*.png";


export function renderView(pageIndex) {
  const contentDom = document.getElementById("content");
  contentDom.innerHTML = "";
  
  const data = questions[pageIndex];
  const element = document.createElement('div');

  const navElement = document.createElement('p');
  navElement.classList.add("navigate")

  const surveyElement = document.createElement("div");
  surveyElement.classList.add("survey-question");

  const questionElement = document.createElement("h3");
  questionElement.innerText = data.question;
  surveyElement.appendChild(questionElement);

  if(data.options){
    const options = data.options;
    const icons = options.icons;
    const optionWrapper = document.createElement("div");
    optionWrapper.classList.add("option-wrapper")

    if(options.polar){
      optionWrapper.classList.add("option-wrapper-polar");  
    } else {
      optionWrapper.classList.add("option-wrapper")
    }

    icons.forEach((icon,index) => {
      const optionElement = document.createElement("div");
      optionElement.setAttribute(constants.IndexAttr, pageIndex);
      optionElement.setAttribute(constants.questionAttr, data.question);
      optionElement.setAttribute(constants.answerAttr, icon.caption);

      if(icons.length === 2){
        optionElement.classList.add("survey-option-polar");
      } else if (icons.length === 5){
        optionElement.classList.add("survey-option");
      } else if (icons.length > 5){
        optionElement.classList.add("survey-option-x2");
      }
      
      const optionImgElement = document.createElement("img");
      optionImgElement.src = images[icon.image.replace(".png","")];
      if(options.grayscaled){
        optionImgElement.classList.add("grayscaled");  
      }

      optionElement.appendChild(optionImgElement);

      if(options.labeled){
        const optionNumElement = document.createElement("p");
        optionNumElement.innerText = icon.caption;
        optionElement.appendChild(optionNumElement);  
      }

      event.optionSelection(optionElement);

      optionWrapper.appendChild(optionElement);
    });
    surveyElement.appendChild(optionWrapper);
  }
  else{
    const textElement = document.createElement("textarea");
    textElement.setAttribute("placeholder","type your message here..");
    textElement.classList.add("text-input");
    textElement.setAttribute(constants.IndexAttr, pageIndex);
    textElement.setAttribute(constants.questionAttr, data.question);
    surveyElement.appendChild(textElement);

    const nextBtn = document.createElement('button');
    nextBtn.classList.add("next-btn")
    nextBtn.innerText = "OK / Proceed";
    
    event.textInputCollection(textElement,nextBtn);
    
    navElement.appendChild(nextBtn);
  }

  element.appendChild(surveyElement);
  element.appendChild(navElement);
  contentDom.appendChild(element);
}

export function homeView(){
  const contentDom = document.getElementById("content");
  contentDom.innerHTML = "";

  const brandElement = document.createElement('div');
  brandElement.classList.add("brand");

  const logoElement = document.createElement("img");
  logoElement.src = images["e-limu-icon"];
  logoElement.classList.add("brand-img");

  const sloganElement = document.createElement('p');
  sloganElement.classList.add("brand-text");
  sloganElement.innerText = "Learning today, leading tomorrow...";

  contentDom.innerHTML = "";
  brandElement.appendChild(logoElement);
  brandElement.appendChild(sloganElement);
  contentDom.appendChild(brandElement);  
}

export function thanksView(){
  const contentDom = document.getElementById("content");
  contentDom.innerHTML = "";

  const thanksElement = document.createElement('p');
  thanksElement.classList.add("thanks-text");
  thanksElement.innerText = "Thank you ❤️";

  contentDom.innerHTML = "";
  contentDom.appendChild(thanksElement);  
}
