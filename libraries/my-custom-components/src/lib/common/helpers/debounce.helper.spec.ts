import { debounce } from './debounce.helper';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should call the callback after the specified delay', () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, 300);

    debouncedFn();
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should use default delay of 300ms when not specified', () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback);

    debouncedFn();
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should reset the timer when called multiple times', () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, 300);

    debouncedFn();
    jest.advanceTimersByTime(100);

    debouncedFn();
    jest.advanceTimersByTime(100);

    debouncedFn();
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should only execute the callback once when debounced', () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, 300);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should work with custom delay values', () => {
    const callback = jest.fn();
    const customDelay = 500;
    const debouncedFn = debounce(callback, customDelay);

    debouncedFn();
    jest.advanceTimersByTime(400);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should properly debounce rapid successive calls', () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, 250);

    // Simulate rapid calls
    for (let i = 0; i < 10; i++) {
      debouncedFn();
      jest.advanceTimersByTime(25);
    }

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(250);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

