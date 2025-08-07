import '@testing-library/jest-dom';
import React from 'react';

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Search: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Search' }, 'Search'),
  Plus: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Plus' }, 'Plus'),
  ArrowUpDown: (props: any) => React.createElement('div', { ...props, 'data-icon': 'ArrowUpDown' }, 'ArrowUpDown'),
  FileText: (props: any) => React.createElement('div', { ...props, 'data-icon': 'FileText' }, 'FileText'),
  CircleCheckBig: (props: any) => React.createElement('div', { ...props, 'data-icon': 'CircleCheckBig' }, 'CircleCheckBig'),
  CircleX: (props: any) => React.createElement('div', { ...props, 'data-icon': 'CircleX' }, 'CircleX'),
  Clock4: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Clock4' }, 'Clock4'),
  ChevronDown: (props: any) => React.createElement('div', { ...props, 'data-icon': 'ChevronDown' }, 'ChevronDown'),
  ChevronRight: (props: any) => React.createElement('div', { ...props, 'data-icon': 'ChevronRight' }, 'ChevronRight'),
  Menu: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Menu' }, 'Menu'),
  RefreshCcw: (props: any) => React.createElement('div', { ...props, 'data-icon': 'RefreshCcw' }, 'RefreshCcw'),
  PlusCircle: (props: any) => React.createElement('div', { ...props, 'data-icon': 'PlusCircle' }, 'PlusCircle'),
  Shield: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Shield' }, 'Shield'),
  X: (props: any) => React.createElement('div', { ...props, 'data-icon': 'X' }, 'X'),
  FileCheck: (props: any) => React.createElement('div', { ...props, 'data-icon': 'FileCheck' }, 'FileCheck'),
  Clock: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Clock' }, 'Clock'),
  FileX: (props: any) => React.createElement('div', { ...props, 'data-icon': 'FileX' }, 'FileX'),
  FilePlus: (props: any) => React.createElement('div', { ...props, 'data-icon': 'FilePlus' }, 'FilePlus'),
}));


// Global mock for react-hook-form
jest.mock('react-hook-form', () => {
  // Global state to manage form data and errors for testing
  let globalFormData: { [key: string]: any } = {};
  let globalFormErrors: { [key: string]: any } = {};
  let globalIsValid = true;

  return {
    useForm: jest.fn(() => ({
      register: jest.fn((name?: string) => ({
        onChange: (e: { target: { value: string; checked?: boolean; type?: string } }) => {
          if (!name) return;
          if (e.target.type === 'checkbox') {
            globalFormData[name] = e.target.checked ?? false;
          } else {
            globalFormData[name] = e.target.value;
          }
        },
        onBlur: jest.fn(),
        name,
        ref: jest.fn()
      })),
      handleSubmit: jest.fn((callback: any) => (e?: any) => {
        e?.preventDefault?.();
        callback(globalFormData);
      }),
      formState: {
        get errors() { return globalFormErrors; },
        get isValid() { return globalIsValid; }
      },
      // Helper functions for testing
      __setFormData: (data: any) => {
        globalFormData = { ...data };
      },
      __setErrors: (errors: any) => {
        globalFormErrors = { ...errors };
      },
      __setIsValid: (isValid: boolean) => {
        globalIsValid = isValid;
      },
      __getFormData: () => globalFormData,
      __reset: () => {
        globalFormData = {};
        globalFormErrors = {};
        globalIsValid = true;
      }
    })),
    useFormContext: jest.fn(),
  };
});

// Global jest mock for Next Image
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: any) => {
        return React.createElement('img', { src, alt, ...props });
    },
}));
