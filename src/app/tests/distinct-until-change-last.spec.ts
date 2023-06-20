import { MonoTypeOperatorFunction } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import { distinctUntilChanged, last } from 'rxjs/operators';

export function distinctUntilChangedLast<T>(): MonoTypeOperatorFunction<string> {
   return obs$ => obs$.pipe(distinctUntilChanged(), last());
}

describe('distinctUntilChangedLast', () => {
   let scheduler: TestScheduler;

   beforeEach(() => {
      scheduler = new TestScheduler((actual, expected) => {
         expect(actual).toEqual(expected);
      });
   });

    it('should emit last distincted value', () => {
      scheduler.run(({ cold, expectObservable }) => {
        const source$ = of('x', 'x', 'y', 'y', 'z', 'a');
        const expected$ = '(a|)'
        const result$ = source$.pipe(distinctUntilChangedLast());
        expectObservable(result$).toBe(expected$);
      });
   });
});
