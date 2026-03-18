import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import css from './checkboxes.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

type TCheckboxStatus = 'checked' | 'unchecked' | 'indeterminate';
const [CHECKED, UNCHECKED, INDETERMINATE]: TCheckboxStatus[] = ['checked', 'unchecked', 'indeterminate']
export type TCheckboxItem = {
    id: string
    label: string
    parent?: TCheckboxItem
    status?: TCheckboxStatus
    children?: TCheckboxItem[]
}

type TCheckboxTreeState = Record<string, TCheckboxItem>

/**
 * Expected input:
 * [
 *   { id: '1', label: 'Electronics', children: [
 *       { id: '1-1', label: 'Phones', children: [
 *           { id: '1-1-1', label: 'iPhone' },
 *           { id: '1-1-2', label: 'Android' },
 *       ]},
 *       { id: '1-2', label: 'Laptops' },
 *   ]},
 *   { id: '2', label: 'Books', children: [
 *       { id: '2-1', label: 'Fiction' },
 *       { id: '2-2', label: 'Non-fiction' },
 *   ]},
 * ]
 */
export const CheckboxTree = ({items}: { items: TCheckboxItem[] }) => {
    // Step 1: process() — recursively flatten items into a Record<id, TCheckboxItem>,
    //   set parent references, inherit selected from parent,
    //   then after processing children: compute selected (allChecked) and indeterminate (!allChecked && someChecked)

    // Step 2: propagate() — when a checkbox is toggled, set selected=value and indeterminate=false
    //   on all descendants recursively

    // Step 3: bubble() — after toggling, walk up via parent references,
    //   recompute selected/indeterminate for each ancestor based on its children

    // Step 4: useState for TCheckboxTreeState,
    //   useEffect to structuredClone items and process them into state,
    //   onSelect handler using event delegation on <ul onChangeCapture>:
    //     - get data-id from target, structuredClone state, toggle element,
    //       propagate to children, bubble to parents, setState

    // Step 5: Checkbox component — renders a single checkbox with useRef for indeterminate,
    //   useEffect to set ref.current.indeterminate,
    //   recursively renders children as nested <ul>

    return <div>TODO: Implement</div>
}
