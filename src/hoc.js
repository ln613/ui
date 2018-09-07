import { connect } from 'react-redux';

const setForm = (n, v) => ({ type: 'setForm', path: 'form.' + n, payload: v });

const getElemValue = (e, i, v) => {
  const t = i || e.target;
  let val = t.value;
  if (t.type === 'checkbox') val = t.checked;
  if (typeof val === 'undefined') val = v;
  return val;
};

export const withForm = connect(
  s => ({ form: s.form }),
  { setForm }
);

export const withInput = isCheck => comp => ({ name, index, label, noLabel, form, setForm, ...args }) => {
  const path = name.replace(/\[/g, '.').replace(/\]/g, '').split('.');
  let value = view(lensPath(path), form);
  if (!isNil(index) && is(Array, value)) value = value[index];
  const onChange = (e, i, v) => {
    const val = getElemValue(e, i, v);
    setForm(name, val, index);
    if (args.onChange) args.onChange(val, index);
  }
  const o = { ...args, id: path.join('_'), name, value, label, onChange };
  if (!noLabel && !label && path.length > 1) o.label = path[1];
  return comp(o);
}

export const withAll = compose(withForm, withInput(false));
export const withCheck = compose(withForm, withInput(true));
