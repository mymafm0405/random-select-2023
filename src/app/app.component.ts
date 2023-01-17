import { GroupServiceService } from "./shared/group-service.service";
import { Component, OnInit } from "@angular/core";
import { StudentServiceService } from "./shared/student-service.service";
import { Student } from "./shared/student.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "random-select";
  showCreateGroupForm = false;
  randomClicked: boolean;
  editClicked: boolean;
  section1 = true;
  section2 = false;
  showBigQuestion = false;
  imageUrl = ''

  constructor(
    private groupService: GroupServiceService,
    private studentService: StudentServiceService
  ) {}

  ngOnInit() {
    // The following code added only to make the big question image working
    this.studentService.selectedStudentChanged.subscribe(
      (updatedStudent: Student) => {
        setTimeout(() => {
          this.showBigQuestion = true;
        }, 3000)
        this.imageUrl = updatedStudent.imageUrl;
        console.log(updatedStudent.imageUrl);
      }
    );
    //
    this.groupService.createGroupClicked.subscribe(
      (createGroupStatus: boolean) => {
        this.showCreateGroupForm = createGroupStatus;
      }
    );
    //
    //
    this.groupService.editClicked.subscribe((editClickedStatus: boolean) => {
      this.editClicked = editClickedStatus;
    });
    //
    //
    this.groupService.randomClicked.subscribe((randomStatus: boolean) => {
      this.randomClicked = randomStatus;
    });
    //
    this.groupService.section1Clicked.subscribe((status: boolean) => {
      if (status) {
        this.section1 = true;
        this.section2 = false;
      }
    });
    this.groupService.section2Clicked.subscribe((status: boolean) => {
      if (status) {
        this.section2 = true;
        this.section1 = false;
      }
    });
  }

  onCloseQuestion() {
    this.showBigQuestion = false;
  }
}
