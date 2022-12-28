import { Component, OnInit } from '@angular/core';
import { slides } from '../../constants';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  isActive = false
  showModal = false
  slides = slides
  constructor() { }

  ngOnInit(): void {
  }
  scrollTo(el: string) {
    let section = document.getElementById(el)
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
      if (el != "hero-wrapper")
        this.toggle()
    }
    else return

  }
  toggle() {
    this.isActive = !this.isActive
  }
}
