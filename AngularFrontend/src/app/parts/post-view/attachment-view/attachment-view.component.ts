import {Component, Input} from '@angular/core';
import {Attachment, dummyAttachment} from "../../../data/models/Attachment";

@Component({
  selector: 'app-attachment-view',
  templateUrl: './attachment-view.component.html',
  styleUrls: ['./attachment-view.component.css']
})
export class AttachmentViewComponent {
  @Input() attachment: Attachment = dummyAttachment();
}
