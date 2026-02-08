import { InputElementModel } from './input-element.model';

describe('InputElementModel<T>', () => {
  describe('Constructor with string type', () => {
    it('should create an instance with default values', () => {
      const input = new InputElementModel<string>();
      expect(input).toBeInstanceOf(InputElementModel);
      expect(input.label).toBe('');
      expect(input.value).toBeNull();
      expect(input.required).toBe(false);
    });

    it('should initialize with partial properties', () => {
      const init = { label: 'Username', value: 'john' };
      const input = new InputElementModel<string>(init);
      expect(input.label).toBe('Username');
      expect(input.value).toBe('john');
      expect(input.required).toBe(false);
    });

    it('should create with all properties', () => {
      const init = {
        label: 'Email',
        value: 'user@example.com',
        required: true,
      };
      const input = new InputElementModel<string>(init);
      expect(input.label).toBe('Email');
      expect(input.value).toBe('user@example.com');
      expect(input.required).toBe(true);

      // BaseHtmlAttributes properties must be set after initialization
      input.ariaLabel = 'Email Input';
      input.description = 'Enter a valid email';
      input.errorMessage = 'Invalid email format';

      expect(input.ariaLabel).toBe('Email Input');
      expect(input.description).toBe('Enter a valid email');
      expect(input.errorMessage).toBe('Invalid email format');
    });

    it('should use defaults for missing properties', () => {
      const init = { label: 'Name' };
      const input = new InputElementModel<string>(init);
      expect(input.label).toBe('Name');
      expect(input.value).toBeNull();
      expect(input.required).toBe(false);
      expect(input.ariaLabel).toBeUndefined();
    });
  });

  describe('Constructor with number type', () => {
    it('should create InputElementModel with number type', () => {
      const init = { label: 'Age', value: 25 };
      const input = new InputElementModel<number>(init);
      expect(input.label).toBe('Age');
      expect(input.value).toBe(25);
      expect(typeof input.value).toBe('number');
    });

    it('should handle zero as a valid number value', () => {
      const init = { label: 'Count', value: 0 };
      const input = new InputElementModel<number>(init);
      expect(input.value).toBe(0);
      expect(input.value).not.toBeNull();
    });

    it('should handle negative numbers', () => {
      const init = { label: 'Temperature', value: -5 };
      const input = new InputElementModel<number>(init);
      expect(input.value).toBe(-5);
    });

    it('should handle decimal numbers', () => {
      const init = { label: 'Price', value: 19.99 };
      const input = new InputElementModel<number>(init);
      expect(input.value).toBe(19.99);
    });
  });

  describe('Constructor with boolean type', () => {
    it('should create InputElementModel with boolean type', () => {
      const init = { label: 'Accept Terms', value: true };
      const input = new InputElementModel<boolean>(init);
      expect(input.label).toBe('Accept Terms');
      expect(input.value).toBe(true);
      expect(typeof input.value).toBe('boolean');
    });

    it('should handle false boolean value', () => {
      const init = { label: 'Agree', value: false };
      const input = new InputElementModel<boolean>(init);
      expect(input.value).toBe(false);
      expect(input.value).not.toBeNull();
    });
  });

  describe('Constructor with object type', () => {
    interface UserData {
      name: string;
      email: string;
      age: number;
    }

    it('should create InputElementModel with complex object type', () => {
      const userData: UserData = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
      };
      const init = { label: 'User Info', value: userData };
      const input = new InputElementModel<UserData>(init);
      expect(input.label).toBe('User Info');
      expect(input.value).toEqual(userData);
      expect(input.value?.name).toBe('John Doe');
      expect(input.value?.email).toBe('john@example.com');
      expect(input.value?.age).toBe(30);
    });

    it('should handle nested objects', () => {
      const complexData = {
        user: { name: 'Jane', id: 1 },
        settings: { theme: 'dark' },
      };
      const init = { label: 'Config', value: complexData };
      const input = new InputElementModel<any>(init);
      expect(input.value.user.name).toBe('Jane');
      expect(input.value.settings.theme).toBe('dark');
    });
  });

  describe('Constructor with array type', () => {
    it('should create InputElementModel with array of strings', () => {
      const init = { label: 'Tags', value: ['typescript', 'jest', 'angular'] };
      const input = new InputElementModel<string[]>(init);
      expect(input.label).toBe('Tags');
      expect(input.value).toEqual(['typescript', 'jest', 'angular']);
      expect(Array.isArray(input.value)).toBe(true);
      expect(input.value?.length).toBe(3);
    });

    it('should handle empty array', () => {
      const init = { label: 'Items', value: [] };
      const input = new InputElementModel<any[]>(init);
      expect(input.value).toEqual([]);
      expect(input.value?.length).toBe(0);
    });

    it('should handle array of objects', () => {
      interface Item {
        id: number;
        name: string;
      }
      const items: Item[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      const init = { label: 'List', value: items };
      const input = new InputElementModel<Item[]>(init);
      expect(input.value).toEqual(items);
      expect(input.value?.[0].name).toBe('Item 1');
    });
  });

  describe('Label property', () => {
    it('should set and get label', () => {
      const input = new InputElementModel<string>({ label: 'First Name' });
      input.label = 'Last Name';
      expect(input.label).toBe('Last Name');
    });

    it('should handle empty label string', () => {
      const input = new InputElementModel<string>({ label: '' });
      expect(input.label).toBe('');
    });

    it('should handle label with special characters', () => {
      const specialLabel = 'User@Email [Required] (*)';
      const input = new InputElementModel<string>({ label: specialLabel });
      expect(input.label).toBe(specialLabel);
    });
  });

  describe('Value property', () => {
    it('should set and get value', () => {
      const input = new InputElementModel<string>({ value: 'initial' });
      input.value = 'updated';
      expect(input.value).toBe('updated');
    });

    it('should return null for unset value', () => {
      const input = new InputElementModel<string>();
      expect(input.value).toBeNull();
    });

    it('should allow setting value to null', () => {
      const input = new InputElementModel<string>({ value: 'something' });
      input.value = null;
      expect(input.value).toBeNull();
    });

    it('should distinguish between null and undefined', () => {
      const input = new InputElementModel<string>();
      expect(input.value).toBeNull();
    });
  });

  describe('Required property', () => {
    it('should set required to true', () => {
      const input = new InputElementModel<string>({ required: true });
      expect(input.required).toBe(true);
    });

    it('should set required to false', () => {
      const input = new InputElementModel<string>({ required: false });
      expect(input.required).toBe(false);
    });

    it('should default to false when not provided', () => {
      const input = new InputElementModel<string>();
      expect(input.required).toBe(false);
    });

    it('should toggle required property', () => {
      const input = new InputElementModel<string>({ required: false });
      input.required = true;
      expect(input.required).toBe(true);
    });
  });

  describe('BaseHtmlAttributes inherited properties', () => {
    it('should inherit ariaLabel from BaseHtmlAttributes', () => {
      const init = { label: 'Name' };
      const input = new InputElementModel<string>(init);
      input.ariaLabel = 'Full Name Input';
      expect(input.ariaLabel).toBe('Full Name Input');
    });

    it('should inherit description from BaseHtmlAttributes', () => {
      const init = { label: 'Age' };
      const input = new InputElementModel<number>(init);
      input.description = 'Enter your age in years';
      expect(input.description).toBe('Enter your age in years');
    });

    it('should inherit errorMessage from BaseHtmlAttributes', () => {
      const init = { label: 'Email' };
      const input = new InputElementModel<string>(init);
      input.errorMessage = 'Email must be valid';
      expect(input.errorMessage).toBe('Email must be valid');
    });

    it('should support all BaseHtmlAttributes properties together', () => {
      const init = {
        label: 'Phone',
        value: '+1234567890',
        required: true,
      };
      const input = new InputElementModel<string>(init);
      input.ariaLabel = 'Phone Number';
      input.description = 'Enter your contact number';
      input.errorMessage = 'Invalid phone format';
      expect(input.label).toBe('Phone');
      expect(input.value).toBe('+1234567890');
      expect(input.required).toBe(true);
      expect(input.ariaLabel).toBe('Phone Number');
      expect(input.description).toBe('Enter your contact number');
      expect(input.errorMessage).toBe('Invalid phone format');
    });

    it('should allow setting inherited properties after construction', () => {
      const input = new InputElementModel<string>({ label: 'Name' });
      input.ariaLabel = 'Full Name';
      input.description = 'Your full name';
      input.errorMessage = 'Name is required';
      expect(input.ariaLabel).toBe('Full Name');
      expect(input.description).toBe('Your full name');
      expect(input.errorMessage).toBe('Name is required');
    });
  });

  describe('Generic type flexibility', () => {
    it('should work with string union types', () => {
      type Status = 'active' | 'inactive' | 'pending';
      const init = { label: 'Status', value: 'active' as Status };
      const input = new InputElementModel<Status>(init);
      expect(input.value).toBe('active');
    });

    it('should work with any type', () => {
      const init = { label: 'Generic', value: { any: 'thing' } };
      const input = new InputElementModel<any>(init);
      expect(input.value.any).toBe('thing');
    });

    it('should maintain type safety across instances', () => {
      const stringInput = new InputElementModel<string>({
        label: 'Text',
        value: 'hello',
      });
      const numberInput = new InputElementModel<number>({
        label: 'Number',
        value: 42,
      });
      expect(typeof stringInput.value).toBe('string');
      expect(typeof numberInput.value).toBe('number');
    });
  });

  describe('Complete workflow', () => {
    it('should create form input with accessibility attributes', () => {
      const config = {
        label: 'Email Address',
        value: 'user@example.com',
        required: true,
      };
      const input = new InputElementModel<string>(config);
      input.ariaLabel = 'Email Address Input Field';
      input.description = 'Enter your email to receive updates';
      input.errorMessage = 'Please enter a valid email address';
      expect(input.label).toBe('Email Address');
      expect(input.value).toBe('user@example.com');
      expect(input.required).toBe(true);
      expect(input.ariaLabel).toBe('Email Address Input Field');
      expect(input.description).toBe('Enter your email to receive updates');
      expect(input.errorMessage).toBe('Please enter a valid email address');
    });

    it('should handle input state changes in a form', () => {
      const input = new InputElementModel<string>({
        label: 'Password',
        required: true,
      });
      input.value = 'initialPassword123';
      expect(input.value).toBe('initialPassword123');
      input.errorMessage = 'Password too short';
      expect(input.errorMessage).toBe('Password too short');
      input.value = 'SecurePassword123!@#';
      input.errorMessage = undefined;
      expect(input.value).toBe('SecurePassword123!@#');
      expect(input.errorMessage).toBeUndefined();
      expect(input.required).toBe(true);
    });

    it('should manage complex form with multiple input types', () => {
      const nameInput = new InputElementModel<string>({
        label: 'Name',
        required: true,
      });
      const ageInput = new InputElementModel<number>({
        label: 'Age',
        required: false,
      });
      const tagsInput = new InputElementModel<string[]>({
        label: 'Interests',
        value: [],
      });
      nameInput.value = 'John Doe';
      ageInput.value = 30;
      tagsInput.value = ['coding', 'music'];
      expect(nameInput.value).toBe('John Doe');
      expect(ageInput.value).toBe(30);
      expect(tagsInput.value).toEqual(['coding', 'music']);
    });
  });
});
