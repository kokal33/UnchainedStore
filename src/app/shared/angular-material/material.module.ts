import { NgModule } from '@angular/core';


import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { InputTextModule } from 'primeng/inputtext';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FileUploadModule } from 'primeng/fileupload';
import { TabMenuModule } from 'primeng/tabmenu';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { StepsModule } from 'primeng/steps';
import { TooltipModule } from 'primeng/tooltip';
import { CdTimerModule } from 'angular-cd-timer';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';


const mat = [

  ToastModule,
  StepsModule,
  TooltipModule,
  TabViewModule,
  NgxAudioPlayerModule,
  InputTextModule,
  TabMenuModule,
  ConfirmPopupModule,
  DialogModule,
  InputNumberModule,
  ToolbarModule,
  MatFormFieldModule,
  ConfirmDialogModule,
  InputNumberModule,
  InputTextareaModule,
  ProgressSpinnerModule,
  ButtonModule,
  DropdownModule,
  MenubarModule,
  ToggleButtonModule,
  DividerModule,
  FileUploadModule,
  AvatarModule,
  OverlayPanelModule,
  CardModule,
  DynamicDialogModule,
  CheckboxModule,
  FieldsetModule,
  CdTimerModule,
  MatAutocompleteModule,
  ChipModule,
  InputSwitchModule,
  MatDialogModule,
  LayoutModule,

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
