import {Component} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {Attachment, dummyAttachment, dummyAttachments} from "../../../data/models/Attachment";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MainService} from "../../../data/main.service";
import {Post} from "../../../data/models/Post";
import {AuthService} from "../../../data/auth.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-post-view',
  templateUrl: './new-post-view.component.html',
  styleUrls: ['./new-post-view.component.css']
})

export class NewPostViewComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<NewPostViewComponent>, private mainService: MainService, private auth: AuthService) {
  }


  matcher = new MyErrorStateMatcher();
  titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);

  title: string = "";
  attachments: Attachment[] = [];
  newAttachmentType: string = 'text'
  newAttachmentContent: string = '';

  addAttachment() {
    let newAttachment: Attachment = {
      attid: "",
      type: this.newAttachmentType,
      content: this.newAttachmentContent
    }
    this.attachments.push(newAttachment);
    this.newAttachmentContent = '';
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.attachments, event.previousIndex, event.currentIndex);
  }

  submitPost() {
    this.mainService.getUser(this.auth.selfVid).subscribe(user => {
      if (!user.isMember) {
        alert("You need to be a member to post");
        return;
      }
      let newPost: Post = {
        authorName: user.name, authorVid: this.auth.selfVid, cid: "", engagement: 0, perception: 0,
        title: "new post",
        attachments: this.attachments
      }
      this.mainService.postPost(newPost)
      console.log("make post")
      this._bottomSheetRef.dismiss();
    });
  }
}
