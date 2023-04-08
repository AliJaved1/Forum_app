import {Component, OnInit} from '@angular/core';
import {MainService} from "../../data/main.service";

@Component({
  selector: 'app-special-view',
  templateUrl: './special-view.component.html',
  styleUrls: ['./special-view.component.css']
})
export class SpecialViewComponent implements OnInit {
  specialMembers: string[] = []

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.getSpecialMembers().subscribe(members => {
        this.specialMembers = members
      }
    )
  }
}
