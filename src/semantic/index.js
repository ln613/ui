import { is, find, isNil } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import { ElemDiv } from '../base/controls'
import { withAll, withCheck, withForm } from '../base/hoc'
import { withState } from '@ln613/compose'
import {
  Input,
  Dropdown,
  Checkbox,
  Responsive,
  Sidebar,
  Icon,
  Menu as _Menu,
  Loader,
} from 'semantic-ui-react'

const toTitleCase = s =>
  s.replace(
    /\w\S*/g,
    t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
  )

// form controls

const textBox = p => (
  <ElemDiv>
    <Input {...p} />
  </ElemDiv>
)

const password = p => (
  <ElemDiv>
    <Input {...p} type="password" />
  </ElemDiv>
)

const select = p => (
  <ElemDiv className="fg1 fixdd">
    <Dropdown selection {...p} />
  </ElemDiv>
)

const withTextValue = withProps(p => ({
  ...p,
  options: (p.options || []).map(o =>
    !is(Object, o)
      ? { text: o, value: o }
      : !o.text && o.name
      ? { ...o, text: o.name, value: o.id }
      : o
  ),
}))

const checkBox = p => (
  <ElemDiv>
    <Checkbox {...p} checked={p.value} />
  </ElemDiv>
)

export const TextBox = withAll(textBox)
export const Password = withAll(password)
export const Select = withAll(withTextValue(select))
export const CheckBox = withCheck(checkBox)

// responsive

export const Mobile = ({ children }) => (
  <Responsive {...Responsive.onlyMobile}>{children}</Responsive>
)

export const Desktop = ({ children }) => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>{children}</Responsive>
)

export const withMobile = Comp => p =>
  (
    <div>
      <Mobile>
        <Comp {...p} isMobile={true} />
      </Mobile>
      <Desktop>
        <Comp {...p} isMobile={false} />
      </Desktop>
    </div>
  )

// menu

const items = (menus, setVisible) =>
  (menus || []).map((x, i) => (
    <Link
      to={'/' + (i === 0 ? '' : x)}
      onClick={() => setVisible(false)}
      key={i}
    >
      <_Menu.Item name={x} style={{ fontWeight: 'bold' }} />
    </Link>
  ))
const _menu = (children, color, rightItems) => (
  <_Menu inverted color={color || 'black'} style={{ margin: 0 }}>
    {children}
    <_Menu.Menu position="right">{rightItems}</_Menu.Menu>
  </_Menu>
)

const Menu1 = ({ color, menus, children, rightItems, visible, setVisible }) => (
  <div>
    <Mobile>
      <Sidebar.Pushable>
        <Sidebar
          as={_Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible={visible}
          color={color || 'black'}
        >
          {items(menus, setVisible)}
        </Sidebar>
        <Sidebar.Pusher
          dimmed={visible}
          onClick={() => visible && setVisible(false)}
          style={{ minHeight: '100vh' }}
        >
          {_menu(
            <_Menu.Item onClick={() => setVisible(!visible)} icon="sidebar" />,
            color,
            rightItems
          )}
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Mobile>
    <Desktop>
      {_menu(items(menus, setVisible), color, rightItems)}
      {children}
    </Desktop>
  </div>
)

export const Menu = withState('visible')(Menu1)

// ready

export const Ready = ({ on, children }) =>
  on.every(ready) ? children : <Loader active inline="centered" />

const ready = x =>
  is(Array, x)
    ? x.length > 0
    : is(Object, x)
    ? Object.keys(x).length > 0
    : !isNil(x)

// table

const _Table = ({
  data,
  name,
  link,
  equalWidth,
  setSort,
  children,
  history,
  isMobile,
}) => {
  children = children && (is(Array, children) ? children : [children])
  const l = data || []
  const keys =
    l.length > 0 ? Object.keys(l[0]).filter(k => !hidden(k, children)) : []
  //const sort = (filter[name] || {}).sort;
  //const sortby = sort && sort[0];
  //const sortDir = sort && sort[1];

  return (
    <table
      className={`ui celled striped table unstackable ${
        isMobile ? 'mobile' : ''
      }`}
      id={name}
      style={isMobile ? { fontSize: '12px' } : {}}
    >
      <thead>
        <tr>
          {keys.map((k, i) => (
            <th
              key={`th${i}`}
              style={
                equalWidth ? { width: Math.floor(100 / keys.length) + '%' } : {}
              }
            >
              {title(k, children)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {l.map((o, i) => (
          <tr
            key={`tr${i}`}
            className={link ? 'cp' : ''}
            onClick={() =>
              link &&
              history.push(
                is(Function, link) ? link(o) : '/' + name + '/' + o.id
              )
            }
          >
            {keys.map(k => col(i, k, o, children))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const Table = compose(
  connect(null, {
    setSort: (name, prop, dir) => ({
      type: actionTypes.Set_Sort,
      name,
      prop,
      dir,
    }),
  }),
  withRouter
)(_Table)

const col = (idx, key, obj, children) => {
  if (!is(Array, children)) children = children ? [children] : []
  const c = find(x => x.key === key, children) ||
    find(x => isNil(x.key), children) || { props: {} }
  const p = c.props

  let v = obj[key]
  let cls = p.class || ''
  if (p.center) cls += ' tac'
  if (p.right) cls += ' tar'
  if (p.input) {
    v = (
      <TextBox
        name={p.path.replace('{i}', idx)}
        noLabel
        className={`${p.center ? 'text-center' : ''} ${
          p.right ? 'text-right' : ''
        }`}
      />
    )
    cls += ' edit'
  } else if (p.select) {
    v = <Select name={p.path.replace('{i}', idx)} options={p.options} />
  }

  return (
    <td key={`td${key + idx}`} className={cls}>
      {p.children ? (
        p.children(obj, obj[key])
      ) : v && v.props ? (
        v
      ) : (
        <div dangerouslySetInnerHTML={{ __html: v }} />
      )}
    </td>
  )
}

const prop =
  (prop, val = '') =>
  (key, children) => {
    const child = find(x => x.key === key, children || [])
    return (child && child.props[prop]) || val
  }

const title = (key, children) => prop('title', toTitleCase(key))(key, children)
const hidden = prop('hidden', false)

// className={sortby === k ? (sortDir === 1 ? '_asc' : '_desc') : ''}
// onClick={() => setSort(name, k, sortDir === 1 ? 2 : 1)}

// DoubleSelect

const s1 = {
  display: 'flex',
  flexDirection: 'row',
}

const s2 = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: '8px',
  marginRight: '8px',
}

const s3 = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}

const s4 = {
  marginBottom: '8px',
}

const select2 = ({
  options,
  placeholder,
  isGroup,
  size,
  multiple,
  onChange,
  value,
}) => (
  <select onChange={onChange} size={size} multiple={multiple} value={value}>
    {isNil(placeholder) ? null : <option value="">{placeholder}</option>}
    {isGroup
      ? Object.keys(options).map(k => optionGroup(k, options))
      : options.map(option)}
  </select>
)

const Select2 = withAll(select2)

const option = o => (
  <option key={o.value || o.id || o} value={o.value || o.id || o}>
    {o.text || o.name || o}
  </option>
)

const optionGroup = (key, options) => (
  <optgroup label={key} key={key}>
    {(options[key] || []).map(option)}
  </optgroup>
)

const _DoubleSelect = ({
  name,
  src,
  dst,
  srcTitle,
  dstTitle,
  size,
  buttonStyle,
  onChange,
  onAdd,
  onRemove,
}) => (
  <div name={name} style={s1}>
    <div style={s3}>
      <div>
        <b>{srcTitle}</b>
      </div>
      <Select2
        name={name + '_src'}
        options={src}
        size={size || 8}
        multiple
        onChange={onChange}
      />
    </div>
    <div style={s2}>
      <button className={buttonStyle} onClick={onAdd} style={s4}>
        &#x3E;&#x3E;
      </button>
      <button className={buttonStyle} onClick={onRemove}>
        &#x3C;&#x3C;
      </button>
    </div>
    <div style={s3}>
      <div>
        <b>{dstTitle}</b>
      </div>
      <Select2
        name={name + '_dst'}
        options={dst}
        size={size || 8}
        multiple
        onChange={onChange}
      />
    </div>
  </div>
)

const getSelectedValue = x => (is(Object, x) ? x.value || x.id : x)
const joinOptions = (o, l, r) =>
  innerJoin(
    (a, b) => (r ? not : identity)(a.value == getSelectedValue(b)),
    o,
    l
  )

export const DoubleSelect = compose(
  withForm,
  withProps(({ name, options, form, setForm }) => {
    const [fn, n] = name.split('.')
    const f = form
    const selectedOptions = (f && f[fn] && f[fn][n]) || []
    const src = joinOptions(options, selectedOptions, true)
    const dst = joinOptions(options, selectedOptions)
    const srcSelected = joinOptions(
      options,
      (f && f[fn] && f[fn][n + '_src']) || []
    )
    const dstSelected = joinOptions(
      options,
      (f && f[fn] && f[fn][n + '_dst']) || []
    )
    const onAdd = () => {
      setForm(name, dst.concat(srcSelected))
      setForm(name + '_src', [])
    }
    const onRemove = () => {
      setForm(name, difference(dst, dstSelected))
      setForm(name + '_dst', [])
    }
    return { src, dst, onAdd, onRemove }
  })
)(_DoubleSelect)
