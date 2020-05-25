export class Topic {
    type : "Task" | "Pre-Read" | "Topic";

    title: string;

    text : string;

    index : number;

    deleted : boolean = false;

    constructor(index: number, type, title : string){
        this.index = index;
        this.type = type;
        this.title = title;

        this.topicNotes = "Notes";
        this.mentorNotes = "Instructions";
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
