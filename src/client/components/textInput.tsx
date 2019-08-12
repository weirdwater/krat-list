import * as React from 'react'
import { isSome, none, some, Maybe } from '../../shared/fun';

export const TextInput = (props: {
  value: Maybe<string>
  type?: 'text' | 'password' | 'email' | 'hidden'
  autoComplete?: 'current-password' | 'new-password' | 'username' | 'email' | 'name'
  disabled?: boolean
  onChange?: (x: Maybe<string>) => void
  id: string
}) => <input
  id={props.id}
  value={isSome(props.value) ? props.value.v : ''}
  type={props.type || 'text'}
  autoComplete={props.autoComplete}
  disabled={props.disabled}
  onChange={e => {
    const { value } = e.target
    props.onChange && props.onChange(value !== '' ? some(value) : none())
  }}
/>
