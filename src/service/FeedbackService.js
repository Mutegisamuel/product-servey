import FeedbackRepository from "../repository/FeedbackRepository";

export default class FeedbackService {
    constructor(){
        this.repository = new FeedbackRepository();
    }
    
    getFeedbacks(){
        this.repository.getAllFeedbacks(function (data){
            console.log("Feedbacks: ", data);
        });
    }

    createFeedback(modelData) {
        this.repository.createFeedback(modelData);
    }
}