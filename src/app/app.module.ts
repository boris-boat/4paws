import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GalleryModule } from 'ng-gallery';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { SliderComponent } from './components/slider/slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
@NgModule({
  declarations: [
    AppComponent,

    HomepageComponent,
    SliderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ReactiveFormsModule, NotifierModule.withConfig({
      position: {
        horizontal: {

          distance: 12, position: "middle"
        }, vertical: {
          distance: 12, position: "bottom", gap: 10

        }
      }
    }), GalleryModule.withConfig({ loop: true, autoPlay: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
