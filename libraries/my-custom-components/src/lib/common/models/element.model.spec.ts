import { ElementModel } from './element.model';

describe('ElementModel', () => {
  describe('Constructor', () => {
    it('should create an instance with default values when no init provided', () => {
      const element = new ElementModel();
      expect(element).toBeInstanceOf(ElementModel);
      expect(element.show).toBe(false);
      expect(element.text).toBe('');
    });

    it('should create an instance with provided partial values', () => {
      const init = { show: true, text: 'Hello World' };
      const element = new ElementModel(init);

      expect(element.show).toBe(true);
      expect(element.text).toBe('Hello World');
    });

    it('should use default values for undefined properties in init', () => {
      const init = { show: true };
      const element = new ElementModel(init);

      expect(element.show).toBe(true);
      expect(element.text).toBe('');
    });

    it('should set show to false when explicitly provided false', () => {
      const init = { show: false, text: 'Test' };
      const element = new ElementModel(init);

      expect(element.show).toBe(false);
      expect(element.text).toBe('Test');
    });

    it('should set empty string when text is explicitly empty', () => {
      const init = { show: true, text: '' };
      const element = new ElementModel(init);

      expect(element.text).toBe('');
      expect(element.show).toBe(true);
    });
  });

  describe('create static method', () => {
    it('should create an instance with provided text and show parameters', () => {
      const text = 'Button Text';
      const show = true;
      const element = ElementModel.create(text, show);

      expect(element).toBeInstanceOf(ElementModel);
      expect(element.text).toBe(text);
      expect(element.show).toBe(show);
    });

    it('should create with show false when specified', () => {
      const text = 'Hidden Element';
      const show = false;
      const element = ElementModel.create(text, show);

      expect(element.show).toBe(false);
      expect(element.text).toBe('Hidden Element');
    });

    it('should create with empty text string', () => {
      const text = '';
      const show = true;
      const element = ElementModel.create(text, show);

      expect(element.text).toBe('');
      expect(element.show).toBe(true);
    });

    it('should create multiple independent instances', () => {
      const text1 = 'First';
      const text2 = 'Second';
      const element1 = ElementModel.create(text1, true);
      const element2 = ElementModel.create(text2, false);

      expect(element1.text).toBe('First');
      expect(element2.text).toBe('Second');
      expect(element1.show).toBe(true);
      expect(element2.show).toBe(false);
    });
  });

  describe('empty static method', () => {
    it('should create an empty instance with default values', () => {
      const element = ElementModel.empty();

      expect(element).toBeInstanceOf(ElementModel);
      expect(element.show).toBe(false);
      expect(element.text).toBe('');
    });

    it('should explicitly set show to false', () => {
      const element = ElementModel.empty();

      expect(element.show).toBe(false);
    });

    it('should explicitly set text to empty string', () => {
      const element = ElementModel.empty();

      expect(element.text).toBe('');
    });

    it('should create independent instances with empty method', () => {
      const element1 = ElementModel.empty();
      const element2 = ElementModel.empty();

      element1.text = 'Modified';
      expect(element2.text).toBe('');
      expect(element1.text).toBe('Modified');
    });

    it('should reset instance state to empty', () => {
      const element = ElementModel.create('Text', true);
      expect(element.text).toBe('Text');
      expect(element.show).toBe(true);
      const emptyElement = ElementModel.empty();

      expect(emptyElement.text).toBe('');
      expect(emptyElement.show).toBe(false);
    });
  });

  describe('Property mutations', () => {
    it('should allow mutation of show property', () => {
      const element = new ElementModel();
      element.show = true;

      expect(element.show).toBe(true);
    });

    it('should allow mutation of text property', () => {
      const element = new ElementModel();
      element.text = 'Updated Text';

      expect(element.text).toBe('Updated Text');
    });

    it('should allow toggling show multiple times', () => {
      const element = new ElementModel({ show: false });
      element.show = true;
      expect(element.show).toBe(true);
      element.show = false;

      expect(element.show).toBe(false);
    });

    it('should allow text replacement', () => {
      const element = new ElementModel({ text: 'Original' });
      element.text = 'Updated';

      expect(element.text).toBe('Updated');
    });
  });

  describe('Type safety', () => {
    it('should maintain type consistency for boolean property', () => {
      const element = new ElementModel({ show: true });
      expect(typeof element.show).toBe('boolean');
      element.show = false;
      expect(typeof element.show).toBe('boolean');
    });

    it('should maintain type consistency for string property', () => {
      const element = new ElementModel({ text: 'Hello' });
      expect(typeof element.text).toBe('string');
      element.text = 'World';
      expect(typeof element.text).toBe('string');
    });

    it('should handle special characters in text', () => {
      const specialText = 'Hello @#$%^&*()_+-=[]{}|;:"<>,.?/';
      const element = ElementModel.create(specialText, true);

      expect(element.text).toBe(specialText);
    });

    it('should handle unicode characters in text', () => {
      const unicodeText = '你好世界 🌍 مرحبا بالعالم';
      const element = ElementModel.create(unicodeText, true);

      expect(element.text).toBe(unicodeText);
    });
  });

  describe('Initialization with null/undefined edge cases', () => {
    it('should treat undefined init as no init parameter', () => {
      const init = undefined;
      const element = new ElementModel(init);

      expect(element.show).toBe(false);
      expect(element.text).toBe('');
    });

    it('should handle init with extra properties gracefully', () => {
      const init = { show: true, text: 'Hello', extraProp: 'ignored' };
      const element = new ElementModel(init as any);

      expect(element.show).toBe(true);
      expect(element.text).toBe('Hello');
      expect((element as any).extraProp).toBeUndefined();
    });
  });
});
