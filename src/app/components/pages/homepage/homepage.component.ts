import { Termin } from './../../../models/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ImageItem, ThumbnailsMode } from 'ng-gallery';
import { CloudService } from 'src/app/services/cloud.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  googleUrl: string = "https://storage.googleapis.com/4paws/"
  isActive: boolean = false
  showModal: boolean = false
  showModal2: boolean = false
  loading: boolean = false
  dogsItems: any = []
  salonItems: any = []
  termini: Termin[] = []
  forma: FormGroup = new FormGroup({
    termin: new FormControl(""),
    ime: new FormControl("", Validators.required),
    kontakt: new FormControl("", Validators.required),
    rasa: new FormControl("", Validators.required),
    usluga: new FormControl("", Validators.required),
  })
  constructor(private service: CloudService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getGalleryPhotos()
    this.getSalonPhotos()
    this.getTermine()
    onscroll = () => {
      this.isActive = false
    };
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
  getGalleryPhotos() {
    this.service.getGalleryPhotos().subscribe((res: any) => {
      let tmp = res[0].filter((item: any) => item.name.length > 9)
      this.dogsItems = tmp.map((image: any) => { return new ImageItem({ src: this.googleUrl + image.name, thumb: this.googleUrl + image.name }) })

    })
  }
  getSalonPhotos() {
    this.loading = true
    this.service.getSalonPhotos().subscribe((res: any) => {
      this.salonItems = res[0].filter((item: any) => item.name.length > 9)
      // this.salonItems = tmp.map((image: any) => { return new Image(1, { src: this.googleUrl + image.name }) }) //ovded kreiraj novu sliku
      this.loading = false
    })
  }
  onBeforeSlide = (detail: any): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
  getTermine() {
    this.service.getTermine().subscribe((res: any) => {
      this.termini = res
    })
  }

  otvoriModal(termin: string) {
    this.showModal2 = true
    this.forma.controls['termin'].patchValue(termin)
    this.forma.controls['termin'].disable()

  }
  sendEmail() {

    if (this.forma.valid) {
      this.notifier.notify("success", "Hvala na upitu!")
      this.notifier.notify("info", "Bićete obavešteni o potvrdi rezervacije u najkraćem roku")
      this.showModal2 = false
      this.service.sendEmail(this.forma.getRawValue()).subscribe((res) => console.log(res))
      this.forma.reset()
    }
    else {
      this.notifier.notify("error", "Sva polja moraju biti ispunjena")

    }


  }
}
