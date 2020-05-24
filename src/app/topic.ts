export class Topic {
    type : "Task" | "Pre-Read" | "Topic";

    title: string;

    text : string;

    index : number;

    constructor(index: number, type, title : string){
        this.index = index;
        this.type = type;
        this.title = title;

        this.topicNotes = index + "topic Notes";
        this.mentorNotes = index + "mentor Notes";
    }

    topicNotes : string = "";
    mentorNotes : string = "";

    getTopicNotes(){
        return this.topicNotes;
    }

    getMentorNotes(){
        return this.mentorNotes;
    }

    setTopicNotes(notes){
        this.topicNotes = notes;
    }

    setMentorNotes(notes){
        this.mentorNotes = notes;
    }
}
