import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customizations } from '../../interfaces/customizations';
import { CommonModule } from '@angular/common';
import { ValidatorService } from '../../../../shared/services/validator.service';
type InputField = "pages" | "languages";

@Component({
   selector: 'budgets-panel',
   standalone: true,
   imports: [ReactiveFormsModule, CommonModule],
   templateUrl: './panel.component.html',
   styleUrl: './panel.component.scss',
})

export class PanelComponent implements OnInit {
   @Input()
   customizations!: Customizations;
   @Output()
   customizationsChanged = new EventEmitter<Customizations>();

   public form = this.fb.group({
      pages: [
         0,
         [
            Validators.min(1),
            Validators.pattern(ValidatorService.onlyNumbersPattern),
         ],
      ],
      languages: [
        0, 
        [
          Validators.min(1), 
          Validators.pattern(ValidatorService.onlyNumbersPattern),
        ]
      ],
   });

   constructor(private fb: FormBuilder) {}

   ngOnInit(): void {

      this.form.controls['pages'].setValue(this.customizations.pages);
      this.form.controls['languages'].setValue(this.customizations.languages);
   }


   setFieldValue(field: InputField, amount: number): void {
      const formControl = this.form.controls[field];
      formControl.setValue(formControl.value! + amount);
      this.emitSettingsChange();
   }

   
   isMinusButtonDisabled(field: InputField): boolean {
      return this.form.get(field)?.value === 0;
   }

   emitSettingsChange(): void {
      const { itemId: serviceId } = this.customizations;
      const { pages, languages } = this.form.value;
      this.customizationsChanged.emit({ 
         itemId: serviceId, 
         pages: pages ?? 0, 
         languages: languages ?? 0 
      });
   }


   openModal(modalId: string) {
      const modal = document.getElementById(modalId)!;
      if (modal) {
         modal.style.display = 'block';
      }
   }

   closeModal(modalId: string) {
      const modal = document.getElementById(modalId)!;
      if (modal) {
         modal.style.display = 'none';
      }
   }
}
