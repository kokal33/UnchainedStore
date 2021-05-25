import { NgModule } from '@angular/core';


import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { InputTextModule } from 'primeng/inputtext';
import { MatFormFieldModule } from '@angular/material/form-field';

import {InplaceModule} from 'primeng/inplace';

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
import { TabMenuModule } from 'primeng/tabmenu';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';

import { TableModule } from 'primeng/table';

import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DataViewModule } from 'primeng/dataview';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { StepsModule } from 'primeng/steps';
import { TooltipModule } from 'primeng/tooltip';


const mat = [

  ToastModule,
  StepsModule,
  TooltipModule,
  TableModule,
  DataViewModule,
  TabViewModule,
  NgxAudioPlayerModule,
  InplaceModule,
  InputTextModule,
  TabMenuModule,
  DialogModule,
  ToolbarModule,
  MatFormFieldModule,
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
  DynamicDialogModule,
  CheckboxModule,
  FieldsetModule,
  ChipModule,
  InputSwitchModule
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
