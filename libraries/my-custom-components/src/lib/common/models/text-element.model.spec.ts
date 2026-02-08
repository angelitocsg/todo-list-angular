import { TextElementModel } from './text-element.model';

describe('TextElementModel', () => {
  describe('Constructor', () => {
    it('should create an instance with default values when no init provided', () => {
      const element = new TextElementModel();
      expect(element).toBeInstanceOf(TextElementModel);
      expect(element.show).toBe(false);
      expect(element.text).toBe('');
    });

    it('should create an instance with provided partial values', () => {
      const init = { show: true, text: 'Hello World' };
      const element = new TextElementModel(init);

      expect(element.show).toBe(true);
      expect(element.text).toBe('Hello World');
    });

    it('should use default values for undefined properties in init', () => {
      const init = { show: true };
      const element = new TextElementModel(init);

      expect(element.show).toBe(true);
      expect(element.text).toBe('');
    });

    it('should set show to false when explicitly provided false', () => {
      const init = { show: false, text: 'Test' };
      const element = new TextElementModel(init);

      expect(element.show).toBe(false);
      expect(element.text).toBe('Test');
    });

    it('should set empty string when text is explicitly empty', () => {
      const init = { show: true, text: '' };
      const element = new TextElementModel(init);

      expect(element.text).toBe('');
      expect(element.show).toBe(true);
    });
  });

  describe('create static method', () => {
    it('should create an instance with provided text and show parameters', () => {
      const text = 'Button Text';
      const show = true;
      const element = TextElementModel.create(text, show);

      expect(element).toBeInstanceOf(TextElementModel);
      expect(element.text).toBe(text);
      expect(element.show).toBe(show);
    });

    it('should create with show false when specified', () => {
      const text = 'Hidden Element';
      const show = false;
      const element = TextElementModel.create(text, show);

      expect(element.show).toBe(false);
      expect(element.text).toBe('Hidden Element');
    });

    it('should create with empty text string', () => {
      const text = '';
      const show = true;
      const element = TextElementModel.create(text, show);

      expect(element.text).toBe('');
      expect(element.show).toBe(true);
    });

    it('should create multiple independent instances', () => {
      const text1 = 'First';
      const text2 = 'Second';
      const element1 = TextElementModel.create(text1, true);
      const element2 = TextElementModel.create(text2, false);

      expect(element1.text).toBe('First');
      expect(element2.text).toBe('Second');
      expect(element1.show).toBe(true);
      expect(element2.show).toBe(false);
    });
  });

  describe('empty static method', () => {
    it('should create an empty instance with default values', () => {
      const element = TextElementModel.empty();

      expect(element).toBeInstanceOf(TextElementModel);
      expect(element.show).toBe(false);
      expect(element.text).toBe('');
    });

    it('should explicitly set show to false', () => {
      const element = TextElementModel.empty();

      expect(element.show).toBe(false);
    });

    it('should explicitly set text to empty string', () => {
      const element = TextElementModel.empty();

      expect(element.text).toBe('');
    });

    it('should create independent instances with empty method', () => {
      const element1 = TextElementModel.empty();
      const element2 = TextElementModel.empty();

      element1.text = 'Modified';
      expect(element2.text).toBe('');
      expect(element1.text).toBe('Modified');
    });

    it('should reset instance state to empty', () => {
      const element = TextElementModel.create('Text', true);
      expect(element.text).toBe('Text');
      expect(element.show).toBe(true);
      const emptyElement = TextElementModel.empty();

      expect(emptyElement.text).toBe('');
      expect(emptyElement.show).toBe(false);
    });
  });

  describe('Property mutations', () => {
    it('should allow mutation of show property', () => {
      const element = new TextElementModel();
      element.show = true;

      expect(element.show).toBe(true);
    });

    it('should allow mutation of text property', () => {
      const element = new TextElementModel();
      element.text = 'Updated Text';

      expect(element.text).toBe('Updated Text');
    });

    it('should allow toggling show multiple times', () => {
      const element = new TextElementModel({ show: false });
      element.show = true;
      expect(element.show).toBe(true);
      element.show = false;

      expect(element.show).toBe(false);
    });

    it('should allow text replacement', () => {
      const element = new TextElementModel({ text: 'Original' });
      element.text = 'Updated';

      expect(element.text).toBe('Updated');
    });
  });

  describe('Type safety', () => {
    it('should maintain type consistency for boolean property', () => {
      const element = new TextElementModel({ show: true });
      expect(typeof element.show).toBe('boolean');
      element.show = false;
      expect(typeof element.show).toBe('boolean');
    });

    it('should maintain type consistency for string property', () => {
      const element = new TextElementModel({ text: 'Hello' });
      expect(typeof element.text).toBe('string');
      element.text = 'World';
      expect(typeof element.text).toBe('string');
    });

    it('should handle special characters in text', () => {
      const specialText = 'Hello @#$%^&*()_+-=[]{}|;:"<>,.?/';
      const element = TextElementModel.create(specialText, true);

      expect(element.text).toBe(specialText);
    });

    it('should handle unicode characters in text', () => {
      const unicodeText = '你好世界 🌍 مرحبا بالعالم';
      const element = TextElementModel.create(unicodeText, true);

      expect(element.text).toBe(unicodeText);
    });
  });

  describe('Initialization with null/undefined edge cases', () => {
    it('should treat undefined init as no init parameter', () => {
      const init = undefined;
      const element = new TextElementModel(init);

      expect(element.show).toBe(false);
      expect(element.text).toBe('');
    });

    it('should handle init with extra properties gracefully', () => {
      const init = { show: true, text: 'Hello', extraProp: 'ignored' };
      const element = new TextElementModel(init as any);

      expect(element.show).toBe(true);
      expect(element.text).toBe('Hello');
      expect((element as any).extraProp).toBeUndefined();
    });
  });
});
