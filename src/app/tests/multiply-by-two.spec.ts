import { MonoTypeOperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

function multiplyByTwo(): MonoTypeOperatorFunction<number> {
  return map(num => 2*num);
}

describe('multiplyByTwo', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
     scheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
     });
  });

  it('should transform given string to number', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('1ms a 2ms |', { a: 1 });
      const expected$ = '   1ms b 2ms |';

      const result$ = source$.pipe(multiplyByTwo());

      expectObservable(result$).toBe(expected$, {b: 2});
   });
  })
});



