import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userEmail: string = '';

  ngOnInit(): void {
    this.userEmail = this.auth.getUserEmail();
    console.log(this.userEmail);
    this.getAllStudents();
    console.log(this.studentsList);
  }


  studentsList: Task[] = [];
  studentObj: Task = {
    StudentId: 0,
    id: '',
    emailId: '',
    TaskName: '',
    Description: '',
    
  };
  StudentId: any = 0;
  id: string = '';
  emailId: string = '';
  TaskName: string = '';
  Description: string = '';
  

  constructor(
    private auth: AuthService,
    private data: DataService,
    private platformlocation: PlatformLocation
  ) {
    history.pushState(null, '', location.href);
    this.platformlocation.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  

  //LogOut Click Event
  logout() {
    this.auth.logout();
  }

  //All Data Get
  getAllStudents() {
    this.data.getAllStudent().subscribe(
      (res) => {
        this.studentsList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        this.studentsList.sort((a, b) => a.StudentId - b.StudentId);
      },
      (err) => {
        alert('fatching the student data');
      }
    );
  }

  //Add Data 
  addstudent() {
    if (this.emailId == '' || this.TaskName == '' || this.Description == '') {
      alert('fill all inputes filed ');
    }

    this.studentObj.StudentId = this.studentsList.length + 1;
    this.studentObj.emailId = this.emailId;
    this.studentObj.TaskName = this.TaskName;
    this.studentObj.Description = this.Description;

   
    this.StudentId = 0;
    this.emailId = '';
    this.TaskName = '';
    this.Description = '';
    this.data.addstudenttask(this.studentObj);
  }

  //Delete Data
  deleteStudent(task: Task) {
    if (window.confirm('are you sure detele this email' + task.emailId))
      this.data.deleteStudent(task);
  }
  
}
