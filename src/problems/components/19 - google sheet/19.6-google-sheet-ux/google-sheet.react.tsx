// @ts-ignore
import { _useState, _useRef, _useEffect, _useMemo, _KeyboardEvent, _CSSProperties } from 'react'
import { TableEngine as _TableEngine } from '../19.5-google-sheet-recompute/solution/table-engine'
import type { CellId as _CellId } from '../19.5-google-sheet-recompute/solution/table-engine'
import styles from '@course/styles'
import cx from '@course/cx'

type TProps = {}

export const GoogleSheet = (_props: TProps) => {
  // TODO: Step 1 - Instantiate the Engine
  // Keep a resilient UI pointer to a `new TableEngine()` reference somewhere inside the component.
  // const engineRef = useRef(new TableEngine())
  return (
    <div className={cx(styles.flexRowCenter, styles.padding24)} style={{ width: '100%', height: '100vh' }}>
      <p>TODO: Implement Virtualized Google Sheet UX</p>
    </div>
  )
}
