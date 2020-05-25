import { Topic } from './topic';

export class Day {
    index : number;

    availableTopics : number = 0;

    constructor(index){
        this.index = index;
    }

    listOfTopics : Topic[] = [];


    addTopic(type : string, title: string){
        this.listOfTopics.push(new Topic(this.listOfTopics.length, type, title));
        this.availableTopics++;
    }

    moveTopic(topic: Topic){
        this.addTopic(topic.type, topic.title);
        this.listOfTopics[this.listOfTopics.length - 1].setMentorNotes(topic.getMentorNotes());
        this.listOfTopics[this.listOfTopics.length - 1].setTopicNotes(topic.getTopicNotes());
    }

    removeTopic(topic: Topic){
        let ind = this.listOfTopics.indexOf(topic, 0);
        this.availableTopics--;
        //if (ind > -1) {
        //    this.listOfTopics.splice(ind, 1);
        //}

        //delete this.listOfTopics[ind];

        this.listOfTopics[ind].deleted = true;
    }

}
