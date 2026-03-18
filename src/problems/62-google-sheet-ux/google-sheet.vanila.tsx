import { AbstractComponent, type TComponentConfig } from 'src/utils/utils'

export class GoogleSheet extends AbstractComponent<any> {
  constructor(config: TComponentConfig<any>) {
    super(config)
  }
  toHTML() {
    return '<div>TODO: Implement Google Sheet</div>'
  }
}
