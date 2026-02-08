import { ButtonElementModel } from './button-element.model';
import { TextElementModel } from './text-element.model';

describe('ButtonElementModel', () => {
  describe('Constructor', () => {
    it('should create an instance extending TextElementModel', () => {
      const button = new ButtonElementModel();
      expect(button).toBeInstanceOf(ButtonElementModel);
      expect(button).toBeInstanceOf(TextElementModel);
    });

    it('should initialize with default values when no init provided', () => {
      const button = new ButtonElementModel();
      expect(button.show).toBe(false);
      expect(button.text).toBe('');
      expect(button.action).toBe('');
      expect(button.disabled).toBe(false);
      expect(button.event).toBeDefined();
      expect(typeof button.event).toBe('function');
    });

    it('should initialize inherited properties from TextElementModel', () => {
      const init = { show: true, text: 'Click me' };
      const button = new ButtonElementModel(init);
      expect(button.show).toBe(true);
      expect(button.text).toBe('Click me');
    });

    it('should initialize button-specific properties', () => {
      const init = {
        action: 'save',
        disabled: true,
        event: jest.fn(),
      };
      const button = new ButtonElementModel(init);
      expect(button.action).toBe('save');
      expect(button.disabled).toBe(true);
      expect(button.event).toBe(init.event);
    });

    it('should initialize with partial properties', () => {
      const init = {
        text: 'Submit',
        action: 'submit',
      };
      const button = new ButtonElementModel(init);
      expect(button.text).toBe('Submit');
      expect(button.action).toBe('submit');
      expect(button.show).toBe(false);
      expect(button.disabled).toBe(false);
      expect(typeof button.event).toBe('function');
    });

    it('should use default event function when none provided', () => {
      const button = new ButtonElementModel();
      const result = button.event();
      expect(result).toBeUndefined();
    });

    it('should use custom event function when provided', () => {
      const mockEvent = jest.fn(() => 'executed');
      const init = { event: mockEvent };
      const button = new ButtonElementModel(init);
      const result = button.event();
      expect(mockEvent).toHaveBeenCalled();
      expect(result).toBe('executed');
    });
  });

  describe('create static method (override)', () => {
    it('should create ButtonElementModel using static create method', () => {
      const text = 'Click Button';
      const show = true;
      const button = ButtonElementModel.create(text, show);
      expect(button).toBeInstanceOf(ButtonElementModel);
      expect(button.text).toBe(text);
      expect(button.show).toBe(show);
    });

    it('should use default values for button-specific properties', () => {
      const text = 'Add';
      const show = true;
      const button = ButtonElementModel.create(text, show);
      expect(button.action).toBe('');
      expect(button.disabled).toBe(false);
      expect(typeof button.event).toBe('function');
    });

    it('should create with show false', () => {
      const text = 'Hidden Button';
      const show = false;
      const button = ButtonElementModel.create(text, show);
      expect(button.show).toBe(false);
      expect(button.text).toBe('Hidden Button');
    });

    it('should create multiple independent instances', () => {
      const text1 = 'Save';
      const text2 = 'Cancel';
      const button1 = ButtonElementModel.create(text1, true);
      const button2 = ButtonElementModel.create(text2, false);
      expect(button1.text).toBe('Save');
      expect(button2.text).toBe('Cancel');
      expect(button1.show).toBe(true);
      expect(button2.show).toBe(false);
    });

    it('should not share event function between instances', () => {
      const button1 = ButtonElementModel.create('Button1', true);
      const button2 = ButtonElementModel.create('Button2', true);
      button1.event = jest.fn(() => 'button1');
      button2.event = jest.fn(() => 'button2');
      expect(button1.event()).toBe('button1');
      expect(button2.event()).toBe('button2');
      expect(button1.event).not.toBe(button2.event);
    });
  });

  describe('empty static method (override)', () => {
    it('should create an empty ButtonElementModel', () => {
      const button = ButtonElementModel.empty();
      expect(button).toBeInstanceOf(ButtonElementModel);
      expect(button.show).toBe(false);
      expect(button.text).toBe('');
    });

    it('should explicitly set all properties to empty/false', () => {
      const button = ButtonElementModel.empty();
      expect(button.show).toBe(false);
      expect(button.text).toBe('');
      expect(button.action).toBe('');
      expect(button.disabled).toBe(false);
    });

    it('should provide a default event function', () => {
      const button = ButtonElementModel.empty();
      expect(typeof button.event).toBe('function');
      expect(button.event()).toBeUndefined();
    });

    it('should create independent instances', () => {
      const button1 = ButtonElementModel.empty();
      const button2 = ButtonElementModel.empty();
      button1.text = 'Modified';
      expect(button2.text).toBe('');
      expect(button1.text).toBe('Modified');
    });

    it('should reset a populated button to empty state', () => {
      const populated = ButtonElementModel.create('Click me', true);
      populated.action = 'save';
      populated.disabled = true;

      expect(populated.text).not.toBe('');
      expect(populated.disabled).toBe(true);
      const empty = ButtonElementModel.empty();
      expect(empty.text).toBe('');
      expect(empty.action).toBe('');
      expect(empty.disabled).toBe(false);
      expect(empty.show).toBe(false);
    });
  });

  describe('Event handling', () => {
    it('should call custom event function', () => {
      const mockEvent = jest.fn<void, []>();
      const button = new ButtonElementModel({ event: mockEvent });
      button.event();
      expect(mockEvent).toHaveBeenCalledTimes(1);
    });

    it('should support event function with no parameters', () => {
      const mockEvent = jest.fn<void, []>(() => {
        console.log('Handled');
      });
      const button = new ButtonElementModel({ event: mockEvent });
      button.event();
      expect(mockEvent).toHaveBeenCalled();
    });

    it('should allow replacing event function', () => {
      const firstEvent = jest.fn<void, []>();
      const secondEvent = jest.fn<void, []>();
      const button = new ButtonElementModel({ event: firstEvent });
      button.event = secondEvent;
      button.event();
      expect(firstEvent).not.toHaveBeenCalled();
      expect(secondEvent).toHaveBeenCalledTimes(1);
    });

    it('should execute event during workflow', () => {
      const mockEvent = jest.fn<void, []>();
      const button = new ButtonElementModel({
        text: 'Click me',
        event: mockEvent,
      });
      button.event();
      expect(mockEvent).toHaveBeenCalled();
    });
  });

  describe('Button-specific properties', () => {
    it('should allow mutation of action property', () => {
      const button = new ButtonElementModel();
      button.action = 'delete';
      expect(button.action).toBe('delete');
    });

    it('should allow mutation of disabled property', () => {
      const button = new ButtonElementModel({ disabled: false });
      button.disabled = true;
      expect(button.disabled).toBe(true);
    });

    it('should toggle disabled state', () => {
      const button = new ButtonElementModel({ disabled: true });
      button.disabled = !button.disabled;
      expect(button.disabled).toBe(false);
    });

    it('should handle complex action strings', () => {
      const complexAction = 'navigate.to.settings.security.change-password';
      const button = new ButtonElementModel({ action: complexAction });
      expect(button.action).toBe(complexAction);
    });
  });

  describe('Inheritance behavior', () => {
    it('should inherit TextElementModel properties', () => {
      const button = new ButtonElementModel({
        show: true,
        text: 'Parent Property',
      });
      expect(button.show).toBe(true);
      expect(button.text).toBe('Parent Property');
    });

    it('should call super constructor correctly', () => {
      const init = {
        show: true,
        text: 'Test',
        action: 'test-action',
      };
      const button = new ButtonElementModel(init);
      expect(button.show).toBe(true);
      expect(button.text).toBe('Test');
      expect(button.action).toBe('test-action');
    });

    it('should properly override parent static methods', () => {
      const elementButton = TextElementModel.create('Element', true);
      const buttonButton = ButtonElementModel.create('Button', true);

      expect(elementButton).toBeInstanceOf(TextElementModel);
      expect(buttonButton).toBeInstanceOf(ButtonElementModel);
      // ButtonElementModel extends TextElementModel, so it's also an instance of TextElementModel
      expect(buttonButton).toBeInstanceOf(TextElementModel);
      // But they are different constructor types
      expect(elementButton.constructor.name).toBe('TextElementModel');
      expect(buttonButton.constructor.name).toBe('ButtonElementModel');
    });
  });

  describe('Complete workflow', () => {
    it('should create and configure a button with full properties', () => {
      const handleClick = jest.fn<void, []>();
      const buttonConfig = {
        text: 'Submit Form',
        show: true,
        action: 'submit',
        disabled: false,
        event: handleClick,
      };
      const button = new ButtonElementModel(buttonConfig);
      button.event();
      expect(button.text).toBe('Submit Form');
      expect(button.show).toBe(true);
      expect(button.action).toBe('submit');
      expect(button.disabled).toBe(false);
      expect(handleClick).toHaveBeenCalled();
    });

    it('should handle button state changes throughout lifecycle', () => {
      const button = ButtonElementModel.create('Click', false);
      button.show = true;
      expect(button.show).toBe(true);
      button.disabled = true;
      expect(button.disabled).toBe(true);
      button.text = 'Loading...';
      expect(button.text).toBe('Loading...');
      button.disabled = false;
      expect(button.disabled).toBe(false);
      expect(button.show).toBe(true);
      expect(button.text).toBe('Loading...');
      expect(button.disabled).toBe(false);
    });
  });
});
