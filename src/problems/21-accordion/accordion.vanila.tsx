import { AbstractComponent, type TComponentConfig } from 'src/utils/utils'
import styles from './accordion.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

/**
 * Expected input:
 * {
 *   root: HTMLElement,
 *   items: [
 *     { id: "1", title: "Section 1", content: "Lorem ipsum..." },
 *     { id: "2", title: "Section 2", content: "Sed ut perspiciatis..." }
 *   ]
 * }
 *
 * Steps to complete:
 * 1. Define properties — create TAccordionItem type (id, title, content) and TAccordionProps (items array)
 * 2. Init constructor — call super with config, add CSS classes (styles.container, flex utilities)
 * 3. Provide toHTML template — map over items, render <details>/<summary>/<p> for each
 * 4. Add CSS — use styles and cx() for className composition
 */
type TAccordionItem = {
  id: string
  title: string
  content: string
}
type TAccordionProps = {
  items: TAccordionItem[]
}

export class Accordion extends AbstractComponent<TAccordionProps> {
  toHTML(): string {
    return ``
  }
}
