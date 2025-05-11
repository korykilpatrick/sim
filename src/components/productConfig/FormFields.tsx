/**
 * This file re-exports form components from the centralized forms directory
 * to maintain backward compatibility with existing code.
 *
 * New code should import directly from @components/forms instead.
 */

// Re-export all form components from the centralized forms directory
export {
  TextField,
  NumberField,
  SelectField,
  DateField,
  TextareaField,
} from '@components/forms';

import { CheckboxGroupField, RadioField } from '@components/forms';
export const CheckboxGroup = CheckboxGroupField;
export const RadioGroup = RadioField;
