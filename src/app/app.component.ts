import { Component } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Day } from './day';
import { Topic } from './topic';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularNotes';

  active = 1;

  topicNotesHtml = '';

  mentorNotesHtml = '';

  currentDay: number = 1;

  newTopicTitle = "";

  selectedTopicIndex = 1;

  moveDay = 1;

  topicTypes = ["Task", "Pre-Read", "Topic"];

  newTopicType = "Task";

  dayIndex = 1;
  allDays: Day[] = [];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
    ]
  };

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allDays[this.currentDay - 1].listOfTopics, event.previousIndex, event.currentIndex);
  }

  addDay() {
    this.allDays.push(new Day(this.dayIndex));
    this.allDays[this.dayIndex - 1].addTopic("Task", "Day " + this.dayIndex + " Task One");
    this.dayIndex++;
  }

  showDay(index) {
    this.currentDay = index;
    if (this.allDays[this.currentDay - 1].listOfTopics.length > 0) {
      this.showContent();
      this.setSelectedTopic(0);
    }
    else {
      this.hideContent();
    }
  }

  showContent() {
    (<HTMLDivElement>document.getElementById("notesContent")).style.display = "block";
  }

  hideContent() {
    (<HTMLDivElement>document.getElementById("notesContent")).style.display = "none";
  }

  constructor(private modalService: NgbModal) {
    this.addDay();
    this.setSelectedTopic(0);
  }

  closeResult = '';

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  modalAddTopic() {
    if (this.newTopicTitle === "" || this.newTopicType === "") {
      return;
    }
    console.log("Title : " + this.newTopicTitle);
    console.log("Type : " + this.newTopicTitle);
    this.allDays[this.currentDay - 1].addTopic(this.newTopicType, this.newTopicTitle);
    this.newTopicTitle = "";
    this.newTopicType = "Task";
    this.showContent();
  }

  setSelectedTopic(ind) {
    this.selectedTopicIndex = ind;
    this.topicNotesHtml = this.allDays[this.currentDay - 1].listOfTopics[this.selectedTopicIndex].topicNotes;
    this.mentorNotesHtml = this.allDays[this.currentDay - 1].listOfTopics[this.selectedTopicIndex].mentorNotes;
    console.log("Selecting " + this.selectedTopicIndex);
  }

  deleteTopic(ind) {
    this.allDays[this.currentDay - 1].removeTopic(this.allDays[this.currentDay - 1].listOfTopics[ind]);
    if(this.allDays[this.currentDay - 1].listOfTopics.length === 0){
      this.hideContent();
    }
  }

  saveNotes() {
    this.allDays[this.currentDay - 1].listOfTopics[this.selectedTopicIndex].topicNotes = this.topicNotesHtml;
    this.allDays[this.currentDay - 1].listOfTopics[this.selectedTopicIndex].mentorNotes = this.mentorNotesHtml;
  }

  moveTopic() {
    this.allDays[this.moveDay - 1].moveTopic(this.allDays[this.currentDay - 1].listOfTopics[this.selectedTopicIndex]);
    this.deleteTopic(this.selectedTopicIndex);
    if(this.allDays[this.currentDay - 1].listOfTopics.length === 0){
      this.hideContent();
    }
  }

}

