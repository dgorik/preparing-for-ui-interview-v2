import { AbstractComponent, type TComponentConfig } from 'src/utils/utils'
import styles from './checkboxes.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

export type TCheckboxItem = {
  id: string
  label: string
  parent?: TCheckboxItem
  selected?: boolean
  indeterminate?: boolean
  children?: TCheckboxItem[]
}

/**
 * Expected input:
 * { items: [
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
 * ]}
 */

export class CheckboxTree extends AbstractComponent<{ items: TCheckboxItem[] }> {
  state: Record<string, TCheckboxItem> = {}

  // Step 1: process() — same as React: recursively flatten items into Record<id, TCheckboxItem>,
  //   set parent refs, inherit selected, compute selected/indeterminate after children

  // Step 2: Constructor — pass listeners: ['change'], process items into this.state

  // Step 3: propagate(item, value) — set selected=value, indeterminate=false on item and
  //   update the DOM checkbox via querySelector('[data-item-id="..."]'), recurse on children

  // Step 4: bubble(item) — walk up parent chain, recompute selected/indeterminate
  //   from children, update parent DOM checkbox, recurse on parent

  // Step 5: toHTML() — filter root items (no parent), return getChildrenTemplate(items)
  //   getChildrenTemplate renders <ul> with getCheckboxTemplate for each item
  //   getCheckboxTemplate renders <li><label><input data-item-id="..." type="checkbox"></label> + nested children</li>

  // Step 6: afterRender() — set indeterminate on DOM checkboxes for items where item.indeterminate is true

  // Step 7: onChange(event) — get data-item-id from target, find item in state,
  //   call propagate(item, checked), then bubble(item)

  constructor(config: TComponentConfig<{ items: TCheckboxItem[] }>) {
    super(config)
  }

  toHTML(): string {
    return '<div>TODO: Implement</div>'
  }
}
