import {Component} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {Attachment} from "../../../data/models/Attachment";

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
  constructor(private _bottomSheetRef: MatBottomSheetRef<NewPostViewComponent>) {
  }

  matcher = new MyErrorStateMatcher();
  titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);

  title: string = "";
  attachments: Attachment[] = [];

  closeSelf(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
