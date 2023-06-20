import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { debounceTime } from 'rxjs/operators';

export function debouncedMap<T>(time: number): MonoTypeOperatorFunction<string> {
   return obs$ => obs$.pipe(debounceTime(time), map((val) => {
      return val ? val + ' World' : '';
  }));
}

describe('debouncedMap', () => {
   let scheduler: TestScheduler;

   beforeEach(() => {
      scheduler = new TestScheduler((actual, expected) => {
         expect(actual).toEqual(expected);
      });
   });

    it('should emit mapped value after given time', () => {
      scheduler.run(({ cold, expectObservable }) => {
         const source$ = cold('abc--|', { a: 'Tongo', b: 'Gleyfy', c: 'DaHul' });
         const expected$ = '   ----c|';
         const result$ = source$.pipe(debouncedMap(2));
         expectObservable(result$).toBe(expected$, { c: 'DaHul World'});
      });
   });
});
