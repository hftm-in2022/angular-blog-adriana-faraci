import { Injectable, signal, WritableSignal, effect } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressStateService {
  private _isLoading: WritableSignal<boolean> = signal(false);

  // Getter for the signal
  get isLoadingValue(): boolean {
    return this._isLoading();
  }

  // Observable for the signal
  get isLoading$(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      const teardown = effect(() => {
        // Push the signal value into the subscriber
        subscriber.next(this._isLoading());
      });

      // Cleanup
      return () => teardown.destroy();
    });
  }

  // Method to update the signal
  setLoadingState(isLoading: boolean): void {
    this._isLoading.set(isLoading);
  }
}
