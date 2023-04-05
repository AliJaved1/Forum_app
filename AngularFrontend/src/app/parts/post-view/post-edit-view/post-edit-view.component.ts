import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Post} from "../../../data/models/Post";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MainService} from "../../../data/main.service";
import {AuthService} from "../../../data/auth.service";
import {FormControl, Validators} from "@angular/forms";
import {Attachment} from "../../../data/models/Attachment";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MyErrorStateMatcher} from "../new-post-view/new-post-view.component";

@Component({
  selector: 'app-post-edit-view',
  templateUrl: './post-edit-view.component.html',
  styleUrls: ['./post-edit-view.component.css']
})
export class PostEditViewComponent {
  matcher = new MyErrorStateMatcher();
  titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);

  title: string = "";
  attachments: Attachment[] = [];
  newAttachmentType: string = 'text'
  newAttachmentContent: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public post: Post, private mainService: MainService, private auth: AuthService) {
    this.title = post.title;
    this.attachments = post.attachments;
  }

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
        authorName: "", authorVid: this.auth.selfVid, cid: "", engagement: 0, perception: 0,
        title: this.title,
        attachments: this.attachments
      }
      this.mainService.deletePost(this.post.cid);
      this.mainService.postPost(newPost);
    });
  }
}
