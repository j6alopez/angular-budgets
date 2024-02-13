import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customizations } from '../../interfaces/extra-features';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'budgets-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent implements OnInit {

  @Input()
  initialCustomizations!: Customizations;
  @Output()
  customizations = new EventEmitter<Customizations>();

  public form = this.fb.group({
    pages: [0,[ Validators.min(1), Validators.pattern("^[0-9]*$")]],
    languages: [0,[ Validators.min(1), Validators.pattern("^[0-9]*$")]]
  });

  constructor( private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.form.controls['pages'].setValue(this.initialCustomizations.pages);
    this.form.controls['languages'].setValue(this.initialCustomizations.languages);
  }

  setPages( amount: number): void {
    const formControl = this.form.controls['pages'];
    formControl.setValue(formControl.value! + amount);
    this.emitSettingsChange();
  }

  setLanguages(amount: number): void {
    const formControl = this.form.controls['languages'];
    formControl.setValue(formControl.value! + amount);
    this.emitSettingsChange();
  }

  emitSettingsChange(): void {
    this.customizations.emit({ 
      pages: this.form.get('pages')?.value || 0, 
      languages: this.form.get('languages')?.value || 0 
    });
  }
  isMinusButtonLanguagesDisabled(): boolean {
    return this.form.get('languages')?.value === 0;
  }

  isMinusButtonPagesDisabled(): boolean {
    return this.form.get('pages')?.value === 0;
  }

  openModal(modalId: string) {
    const modal = document.getElementById(modalId)!; 
    if(modal) {
      modal.style.display='block';
    }
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId)!; 
    if(modal) {
      modal.style.display='none';
    }
  }

}
