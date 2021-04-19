import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FileUploadModule } from 'primeng/fileupload';

import { ToastModule } from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';
import {TabViewModule} from 'primeng/tabview';
import {DynamicDialogModule} from 'primeng/dynamicdialog';






const mat = [
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  ToastModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  TabViewModule,
  MatInputModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatDividerModule,
  NgxAudioPlayerModule,
  InputTextModule,
  DialogModule,
  ToolbarModule,
  ConfirmDialogModule,
  RatingModule,
  InputNumberModule,
  InputTextareaModule,
  RadioButtonModule,
  ButtonModule,
  DropdownModule,
  MenubarModule,
  ToggleButtonModule,
  DividerModule,
  MultiSelectModule,
  FileUploadModule,
  AvatarModule,
  OverlayPanelModule,
  CardModule,
  DynamicDialogModule
];

@NgModule({
  imports: [
    ...mat,
  ],
  exports: [
    ...mat,
  ],
})
export class MaterialModule { }
