import { textBox, select, checkBoxWithLabel } from './controls';
import { withAll, withCheck } from './hoc';

export const TextBox = withAll(textBox);
export const Select = withAll(select);
export const CheckBox = withCheck(checkBoxWithLabel);
