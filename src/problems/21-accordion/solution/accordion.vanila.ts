import { AbstractComponent, type TComponentConfig } from 'src/utils/utils'
import styles from './accordion.module.css'

import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

type TAccordionProps = {
  items: TAccordionItem[]
}
export type TAccordionItem = {
  id: string
  title: string
  content: string
}

export class Accordion extends AbstractComponent<TAccordionProps> {
  constructor(config: TComponentConfig<TAccordionProps>) {
    super({
      ...config,
      className: [
        styles.container,
        flex.maxW600px,
        flex.flexColumnGap12,
        ...(config.className || []),
      ],
    })
  }

  toHTML(): string {
    return this.config.items
      .map((item) => {
        return `
                <details class="${styles.details}">
                    <summary class="${cx(styles.summary, flex.flexRowBetween, flex.paddingHor16, flex.paddingVer12, flex.fontXL)}">${item.title}</summary>
                    <p class="${cx(styles.content, flex.paddingVer16, flex.paddingHor16)}">${item.content}</p>
                </details>
            `
      })
      .join('')
  }
}
