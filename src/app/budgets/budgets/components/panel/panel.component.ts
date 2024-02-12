import { Component, EventEmitter, Output } from '@angular/core';
import { Settings } from '../../interfaces/settings';

@Component({
  selector: 'budgets-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  @Output()
  settings = new EventEmitter<Settings>();

  public pages: number = 0;
  public languages: number = 1;

  setPages(amount: number): void {
    this.pages += amount;
    this.settingsChanged();
  }

  setLanguages(amount: number): void {
    this.languages += amount;
    this.settingsChanged();
  }

  settingsChanged(): void {
    this.settings.emit({ pages: this.pages, languages: this.languages });
  }
}
