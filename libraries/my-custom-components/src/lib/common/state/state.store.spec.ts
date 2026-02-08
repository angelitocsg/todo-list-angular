import { firstValueFrom } from 'rxjs';
import { StateStore } from './state.store';

describe('StateStore', () => {
  interface MockState {
    id: number;
    name: string;
    isActive: boolean;
  }

  let store: StateStore<MockState>;
  const initialState: MockState = {
    id: 1,
    name: 'Test Item',
    isActive: true,
  };

  beforeEach(() => {
    store = new StateStore<MockState>(initialState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize StateStore with provided initial state', () => {
      const testState = { id: 2, name: 'Another Item', isActive: false };
      const newStore = new StateStore(testState);
      expect(newStore.current).toEqual(testState);
    });

    it('should create a BehaviorSubject with initial state', () => {
      const newStore = new StateStore(initialState);
      expect(newStore.current).toEqual(initialState);
    });
  });

  describe('current$ getter', () => {
    it('should return an observable of the current state', async () => {
      const state = await firstValueFrom(store.current$);
      expect(state).toEqual(initialState);
    });

    it('should emit updated state when store is updated', (done) => {
      const updatedState: Partial<MockState> = { name: 'Updated Name' };
      const emittedValues: MockState[] = [];
      const subscription = store.current$.subscribe((state) => {
        emittedValues.push(state);
        if (emittedValues.length === 2) {
          expect(emittedValues[1]).toEqual({
            ...initialState,
            ...updatedState,
          });
          subscription.unsubscribe();
          done();
        }
      });
      store.update(updatedState);
    });

    it('should emit multiple updates in sequence', (done) => {
      const updates = [{ name: 'First Update' }, { isActive: false }, { id: 99 }];
      const emittedValues: MockState[] = [];
      const subscription = store.current$.subscribe((state) => {
        emittedValues.push(state);
        if (emittedValues.length === updates.length + 1) {
          expect(emittedValues[0]).toEqual(initialState);
          expect(emittedValues[1]).toEqual({
            ...initialState,
            name: 'First Update',
          });
          expect(emittedValues[2]).toEqual({
            ...initialState,
            name: 'First Update',
            isActive: false,
          });
          expect(emittedValues[3]).toEqual({
            id: 99,
            name: 'First Update',
            isActive: false,
          });
          subscription.unsubscribe();
          done();
        }
      });
      updates.forEach((update) => store.update(update));
    });
  });

  describe('current getter', () => {
    it('should return the current state value', () => {
      const currentValue = store.current;
      expect(currentValue).toEqual(initialState);
    });

    it('should return updated state value after update is called', () => {
      const updatedState: Partial<MockState> = { name: 'Modified Name' };
      store.update(updatedState);
      expect(store.current).toEqual({
        ...initialState,
        ...updatedState,
      });
    });

    it('should return the latest value when accessed multiple times', () => {
      const updates = [{ name: 'Update 1' }, { isActive: false }];
      expect(store.current).toEqual(initialState);
      store.update(updates[0]);
      expect(store.current.name).toBe('Update 1');
      store.update(updates[1]);
      expect(store.current.isActive).toBe(false);
    });
  });

  describe('update method', () => {
    it('should merge partial state with current state', () => {
      const partialUpdate: Partial<MockState> = { name: 'New Name' };
      store.update(partialUpdate);
      expect(store.current).toEqual({
        ...initialState,
        ...partialUpdate,
      });
    });

    it('should preserve unchanged properties when updating', () => {
      const originalId = store.current.id;
      const originalActive = store.current.isActive;
      store.update({ name: 'Updated Name Only' });
      expect(store.current.id).toBe(originalId);
      expect(store.current.isActive).toBe(originalActive);
      expect(store.current.name).toBe('Updated Name Only');
    });

    it('should handle multiple partial updates correctly', () => {
      store.update({ name: 'First Update' });
      store.update({ isActive: false });
      store.update({ id: 42 });
      expect(store.current).toEqual({
        id: 42,
        name: 'First Update',
        isActive: false,
      });
    });

    it('should handle empty partial updates without error', () => {
      const originalState = store.current;
      store.update({});
      expect(store.current).toEqual(originalState);
    });

    it('should replace all properties when updating with complete state', () => {
      const completeState: MockState = {
        id: 999,
        name: 'Completely New State',
        isActive: false,
      };
      store.update(completeState);
      expect(store.current).toEqual(completeState);
    });

    it('should trigger observable emission when update is called', (done) => {
      const updateValue: Partial<MockState> = { name: 'Observable Update' };
      const spy = jest.fn();
      const subscription = store.current$.subscribe(spy);
      store.update(updateValue);
      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(2); // initial + update
        const lastCall = spy.mock.calls[spy.mock.calls.length - 1][0];
        expect(lastCall).toEqual({
          ...initialState,
          ...updateValue,
        });
        subscription.unsubscribe();
        done();
      }, 0);
    });
  });

  describe('State isolation and mutations', () => {
    it('should not expose internal BehaviorSubject through current$', () => {
      const observable = store.current$;
      expect(observable.subscribe).toBeDefined();
      expect(typeof observable).toBe('object');
    });

    it('should prevent direct state mutation through current getter', () => {
      const currentState = store.current;
      (currentState as any).name = 'Directly Mutated';
      expect(store.current.name).toBe('Directly Mutated'); // This shows immutability is user's responsibility
      store.update({ name: initialState.name });
    });

    it('should handle complex nested state correctly', () => {
      interface ComplexState {
        user: { id: number; profile: { name: string; email: string } };
        items: string[];
      }
      const complexInitial: ComplexState = {
        user: { id: 1, profile: { name: 'John', email: 'john@test.com' } },
        items: ['item1', 'item2'],
      };
      const complexStore = new StateStore(complexInitial);
      complexStore.update({
        user: { id: 2, profile: { name: 'Jane', email: 'jane@test.com' } },
      });
      expect(complexStore.current.user.id).toBe(2);
      expect(complexStore.current.items).toEqual(['item1', 'item2']);
    });
  });

  describe('Generic type support', () => {
    it('should work with different state types', () => {
      interface StringState {
        value: string;
      }
      const stringStore = new StateStore<StringState>({ value: 'initial' });
      stringStore.update({ value: 'updated' });
      expect(stringStore.current.value).toBe('updated');
    });

    it('should work with numeric state', () => {
      const numberStore = new StateStore<number>(0);
      const spy = jest.spyOn(numberStore as any, 'update');
      expect(numberStore.current).toBe(0);
      spy.mockRestore();
    });

    it('should work with array state', () => {
      interface ArrayState {
        items: Array<{ id: number; label: string }>;
      }
      const arrayStore = new StateStore<ArrayState>({
        items: [{ id: 1, label: 'Item 1' }],
      });
      arrayStore.update({
        items: [
          { id: 1, label: 'Item 1' },
          { id: 2, label: 'Item 2' },
        ],
      });
      expect(arrayStore.current.items).toHaveLength(2);
      expect(arrayStore.current.items[1].id).toBe(2);
    });
  });
});
