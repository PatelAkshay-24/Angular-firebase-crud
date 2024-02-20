import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Task } from '../model/task';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }


  //Add student 

  addstudenttask(Task : Task){
    Task.id = this.afs.createId();
    return this.afs.collection('/Students').add(Task)

  }

  // get all students
  getAllStudent(){
    return this.afs.collection('/Students').snapshotChanges()
  }

  //delete student
  deleteStudent(Task : Task){
    return this.afs.doc('/Students/'+Task.id).delete();
  }

  //update Students
  updateStudent(Task:Task){
    this.deleteStudent(Task),
    this.addstudenttask(Task)
  }

  
}
