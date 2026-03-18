import { AbstractComponent, type TComponentConfig } from '../00-abstract-component/component'
import styles from './heatmap.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

type TProps = {}

export class Heatmap extends AbstractComponent<TProps> {
  constructor(config: TComponentConfig<TProps>) {
    super(config)
  }

  toHTML(): string {
    return '<div>TODO: Implement</div>'
  }
}
