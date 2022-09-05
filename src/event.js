import * as constants from "./constants";
import * as utils from "./utils";
import * as views from "./view";

export function doSkip(){
    alert();
}

export function optionSelection(optionElement){

    optionElement.addEventListener('click', function(e){
        const currentIndex = parseInt(this.getAttribute(constants.IndexAttr));
        const question = this.getAttribute(constants.questionAttr);
        const answer = this.getAttribute(constants.answerAttr);
        utils.setResponse({currentIndex,question,answer});

        if(currentIndex + 1 === constants.questionMax){
            utils.submitResponse();
          } else {
            const pageIndex = utils.doNext(currentIndex);
            views.renderView(pageIndex);
        }
    });
}

export function textInputCollection(textElement, nextBtn, ){

    nextBtn.addEventListener('click', (e) => {
        const currentIndex = parseInt(textElement.getAttribute(constants.IndexAttr));
        const question = textElement.getAttribute(constants.questionAttr);
        const answer = textElement.value;
        utils.setResponse({currentIndex,question,answer});
        const pageIndex = utils.doNext(currentIndex);
        views.renderView(pageIndex);
  });      
}

