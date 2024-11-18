import { Timestamp } from "firebase/firestore";

export interface IQuizzStore {
    quizzId ?: string,
    quizzName : string,
    quizzDescription ?: string,
    quizzImage ?: string,
    createAt : Timestamp,
    duration : number,
    numberOfQuestions : number,
    category : string,
    numLike : number,
    numDisLike : number,
}