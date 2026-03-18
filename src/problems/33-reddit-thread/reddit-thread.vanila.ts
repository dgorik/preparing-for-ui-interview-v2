import { AbstractComponent, type TComponentConfig } from 'src/utils/utils'
import styles from './reddit-thread.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

export interface IRedditComment {
  id: string
  nickname: string
  text: string
  date: string
  replies: IRedditComment[]
}

export type TRedditThreadProps = {
  comments: IRedditComment[]
}

/**
 * Expected data sample:
 * {
 *   comments: [
 *     {
 *       id: "1",
 *       nickname: "user123",
 *       text: "This is a top-level comment",
 *       date: "2024-01-15",
 *       replies: [
 *         {
 *           id: "2",
 *           nickname: "replier456",
 *           text: "This is a nested reply",
 *           date: "2024-01-16",
 *           replies: []
 *         }
 *       ]
 *     }
 *   ]
 * }
 *
 * Step 1: Extend AbstractComponent<TRedditThreadProps>
 * - Call super() with config, adding className: [styles.container]
 *
 * Step 2: Implement a private renderComment method (recursive)
 * - Render an <article> with styles.comment and flex.padding16
 * - <header> with flex.flexRowBetween: <strong> for nickname, <time> for date
 * - <p> for comment text with padding classes
 * - If comment.replies.length > 0, render <details>/<summary> with "Replies"
 * - Inside <details>, render a <ul> with each reply as <li>, calling renderComment recursively
 *
 * Step 3: Implement toHTML
 * - Map over this.config.comments, calling renderComment for each, and join
 */
export class RedditThread extends AbstractComponent<TRedditThreadProps> {
  constructor(config: TComponentConfig<TRedditThreadProps>) {
    super(config)
  }

  toHTML(): string {
    return '<div>TODO: Implement</div>'
  }
}
