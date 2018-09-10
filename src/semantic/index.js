import { withProps } from 'recompose';
import { ElemDiv } from '../base/controls';
import { withAll, withCheck } from '../base/hoc';
import { Input, Dropdown, Checkbox, Responsive, Sidebar, Icon, Menu as _Menu, Loader } from 'semantic-ui-react';

const textBox = p =>
  <ElemDiv>
    <Input {...p} />
  </ElemDiv>

const select = p =>
  <ElemDiv>
    <Dropdown selection {...p} />
  </ElemDiv>
const withTextValue = withProps(p => ({...p, options: (p.options || []).map(o => !o.text && o.name ? {...o, text: o.name, value: o.id} : o)}));

const checkBox = p =>
  <ElemDiv>
    <Checkbox {...p} checked={p.value} />
  </ElemDiv>

export const TextBox = withAll(textBox);
export const Select = withAll(withTextValue(select));
export const CheckBox = withCheck(checkBox);
