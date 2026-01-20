export type TButtonAction = (state: string, operator: string) => string

export type TCalculatorButton = {
  label: string
  action: TButtonAction
}

export const INVALID_VALUE = 'Invalid value'
const OPERATIONS = new Set(['+', '-', '*', '/', '%'])

export const toFixedWithoutZeros = (num: number, precision: number) =>
  num.toFixed(precision).replace(/\.*0+$/, '')

export const negate: TButtonAction = (state: string) => {
  if (state.match(/-\(.*\)/)) {
    return state.slice(2, -1)
  } else {
    return `-(${state})`
  }
}

export const clear: TButtonAction = (_: string, __: string) => '0'

export const calculate: TButtonAction = (state: string, _: string) => {
  if (!state.match(/[0-9.()+/%*-]/)) {
    return INVALID_VALUE
  }
  try {
    const result = Number(new Function('return ' + state)())
    if (Number.isNaN(result)) {
      return INVALID_VALUE
    } else {
      return toFixedWithoutZeros(result, 5)
    }
  } catch (_e) {
    return INVALID_VALUE
  }
}

export const applyOperation: TButtonAction = (state: string, operator: string) => {
  return OPERATIONS.has(state.at(-1) ?? '') ? state.slice(0, -1) + operator : state + operator
}

export const applyNumber: TButtonAction = (state: string, number: string) => {
  return state === '0' ? number : state + number
}

export const BUTTONS = new Map<string, TCalculatorButton>([
  [
    'AC',
    {
      label: 'AC',
      action: clear,
    },
  ],
  [
    '+/-',
    {
      label: '+/-',
      action: negate,
    },
  ],
  ['%', { label: '%', action: applyOperation }],
  ['/', { label: '/', action: applyOperation }],
  ['7', { label: '7', action: applyNumber }],
  ['8', { label: '8', action: applyNumber }],
  ['9', { label: '9', action: applyNumber }],
  ['*', { label: '*', action: applyOperation }],
  ['4', { label: '4', action: applyNumber }],
  ['5', { label: '5', action: applyNumber }],
  ['6', { label: '6', action: applyNumber }],
  ['-', { label: '-', action: applyOperation }],
  ['1', { label: '1', action: applyNumber }],
  ['2', { label: '2', action: applyNumber }],
  ['3', { label: '3', action: applyNumber }],
  ['+', { label: '+', action: applyOperation }],
  ['0', { label: '0', action: applyNumber }],
  ['.', { label: '.', action: applyNumber }],
  [
    '=',
    {
      label: '=',
      action: calculate,
    },
  ],
])
