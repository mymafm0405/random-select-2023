import { GroupServiceService } from "./../../shared/group-service.service";
import { StudentServiceService } from "./../../shared/student-service.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Student } from "src/app/shared/student.model";

@Component({
  selector: "app-student-selected",
  templateUrl: "./student-selected.component.html",
  styleUrls: ["./student-selected.component.css"],
})
export class StudentSelectedComponent implements OnInit, OnDestroy {
  showRandomWheel = true;
  showWinnerStudent = false;
  selectedStudent: Student;
  randomSound = new Audio();
  startPhotoRandom: any;
  // startPhotoRandom2: any;
  photoSrc: string;
  flowerBg: string;
  groupIndex: number;
  currentGroupStudents: Student[];
  // image: any;

  constructor(
    private studentService: StudentServiceService,
    private groupService: GroupServiceService
  ) {}

  ngOnInit() {
    //
    this.currentGroupStudents = this.studentService.currentGroupStudents;
    //
    this.studentService.currentGroupStudentsChanged.subscribe(
      (updatedCurrentGroupStudents: Student[]) => {
        this.currentGroupStudents = updatedCurrentGroupStudents;
      }
    );
    //
    this.groupIndex = this.groupService.groupIndex;
    //
    this.groupService.groupIndexChanged.subscribe(
      (updatedGroupIndex: number) => {
        this.groupIndex = updatedGroupIndex;
        console.log(this.groupIndex);
      }
    );
    //
    this.selectedStudent = this.studentService.selectedStudent;
    //
    if (this.groupIndex > 8) {
      // this.randomSound.src = "../../../assets/sounds/roll.mp3";
      this.randomSound.src = "../../../assets/sounds/newRandom.mpeg";
      this.randomSound.play();
      setTimeout(() => {
        this.randomSound.pause();
      }, 2000);
    } else {
      // this.randomSound.src = "../../../assets/sounds/prizeWheel.mp3";
      this.randomSound.src = "../../../assets/sounds/newRandom.mpeg";
      this.randomSound.play();
    }
    //
    this.photoRandom(this.groupIndex);
    // this.photoRandom2();
    //
    setTimeout(() => {
      this.showRandomWheel = false;
      this.showWinnerStudent = true;
      clearInterval(this.startPhotoRandom);
      // clearInterval(this.startPhotoRandom2);
    }, 2000);
    //
    this.groupService.randomClicked.subscribe((randomStatus: boolean) => {
      //
      this.photoRandom(this.groupIndex);
      // this.photoRandom2();
      //
      this.showRandomWheel = randomStatus;
      this.showWinnerStudent = !randomStatus;
      //
      if (this.groupIndex > 8) {
        this.randomSound.src = "../../../assets/sounds/newRandom.mpeg";
        this.randomSound.play();
        setTimeout(() => {
          this.randomSound.pause();
        }, 2000);
      } else {
        this.randomSound.src = "../../../assets/sounds/newRandom.mpeg";
        this.randomSound.play();
      }
      //
      setTimeout(() => {
        this.showRandomWheel = false;
        this.showWinnerStudent = true;
        clearInterval(this.startPhotoRandom);
        // clearInterval(this.startPhotoRandom2);
      }, 2000);
    });
    //
    this.studentService.selectedStudentChanged.subscribe(
      (updatedStudent: Student) => {
        this.selectedStudent = updatedStudent;
      }
    );
  }

  photoRandom(groupIndex: number) {
    this.startPhotoRandom = setInterval(() => {
      if (groupIndex !== undefined) {
        this.photoSrc = "/assets/images/students/question-mark.png";
      }
    }, 100);
    this.flowerBg = "assets/images/" + groupIndex + ".png";
    console.log(this.flowerBg);
  }

  ngOnDestroy(): void {
    this.showRandomWheel = false;
  }
}
