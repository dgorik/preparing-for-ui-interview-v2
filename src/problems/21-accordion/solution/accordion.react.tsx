import css from './accordion.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

export type TAccordionItem = {
  id: string
  title: string
  content: string
}

export const Accordion = ({ items }: { items: TAccordionItem[] }) => {
  return (
    <div className={cx(css.container, flex.maxW600px, flex.flexColumnGap12, flex.w100)}>
      {items.map((item) => (
        <details key={item.id} className={css.details}>
          <summary
            className={cx(
              css.summary,
              flex.flexRowBetween,
              flex.paddingHor16,
              flex.paddingVer12,
              flex.fontXL,
            )}
          >
            {item.title}
          </summary>
          <p className={cx(css.content, flex.paddingVer16, flex.paddingHor16)}>{item.content}</p>
        </details>
      ))}
    </div>
  )
}
