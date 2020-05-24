import { Topic } from './topic';

export class Day {
    index : number;

    constructor(index){
        this.index = index;
    }

    listOfTopics : Topic[] = [];


    addTopic(type : string, title: string){
        this.listOfTopics.push(new Topic(this.listOfTopics.length, type, title));
    }

    moveTopic(topic: Topic){
        topic.index = this.listOfTopics.length;
        this.listOfTopics.push(topic);
    }

    removeTopic(topic: Topic){
        let ind = this.listOfTopics.indexOf(topic, 0);

        if (ind > -1) {
            this.listOfTopics.splice(ind, 1);
        }

        //delete this.listOfTopics[ind];
    }

}
