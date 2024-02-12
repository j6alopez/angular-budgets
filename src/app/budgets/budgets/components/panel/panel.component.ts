import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Settings } from '../../interfaces/settings';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'budgets-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {

  @Output()
  settings = new EventEmitter<Settings>();

  public form = this.fb.group({
    pages: [0,[ Validators.min(1)]],
    languages: [0,[ Validators.min(1)]]
  });

  constructor( private fb: FormBuilder) {
  }

  setPages( amount: number): void {
    const formControl = this.form.controls['pages'];
    formControl.setValue(formControl.value! + amount);
    this.emitSettingsChange();
    this.emitSettingsChange();
  }

  setLanguages(amount: number): void {
    const formControl = this.form.controls['languages'];
    formControl.setValue(formControl.value! + amount);
    this.emitSettingsChange();
  }

  emitSettingsChange(): void {
    this.settings.emit({ 
      pages: this.form.get('pages')?.value || 0, 
      languages: this.form.get('languages')?.value || 0 
    });
  }
  isMinusLanguagesDisabled(): boolean {
    return this.form.get('languages')?.value === 0;
  }

  isMinusPagesDisabled(): boolean {
    return this.form.get('pages')?.value === 0;
  }

}
