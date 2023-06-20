import { MonoTypeOperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

function dividableByThree(): MonoTypeOperatorFunction<number> {
  return filter(number => number % 3 === 0);
}

describe('dividableByThree', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
     scheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
     });
  });

  it('should pass numbers dividable by 3', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('1ms a 2ms |', { a: 9 });
      const expected$ = '   1ms b 2ms |';

      const result$ = source$.pipe(dividableByThree());

      expectObservable(result$).toBe(expected$, {b: 9});
   });

  })

  it('should not pass numbers not dividable by 3', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('1ms a 2ms |', { a: 5 });
      const expected$ = '   1ms - 2ms |';

      const result$ = source$.pipe(dividableByThree());

      expectObservable(result$).toBe(expected$);
   });

  })
})
