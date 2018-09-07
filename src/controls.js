import React from 'react';
import { isNil } from 'ramda';

export const ElemDiv = ({children}) => <div class="pv8">{children}</div>

export const textBox = p =>
  <ElemDiv>
    <input type="text" {...p} />
  </ElemDiv>

export const checkBox = p =>
  <input type="checkbox" checked={p.value} {...p} />

export const radio = p =>
  <ElemDiv>
    <input type="radio" {...p} />
  </ElemDiv>

export const select = ({ options, placeholder, isGroup, size, multiple, onChange, value }) =>
  <select onChange={onChange} size={size} multiple={multiple} value={value}>
    {isNil(placeholder) ? null : <option value="">{placeholder}</option>}
    {isGroup
      ? Object.keys(options).map(k => optionGroup(k, options))
      : options.map(option)
    }
  </select>

const option = o =>
  <option key={o.value || o.id || o} value={o.value || o.id || o}>{o.text || o.name || o}</option>

const optionGroup = (key, options) =>
  <optgroup label={key} key={key}>
    {(options[key] || []).map(option)}
  </optgroup>

export const checkBoxWithLabel = p => 
  <ElemDiv>
    {checkBox(p)}
    {p.title ?
      <label htmlFor={p.name} class="label-align">
        {p.title}
      </label>
    : null}
  </ElemDiv>
