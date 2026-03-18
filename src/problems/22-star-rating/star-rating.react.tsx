import css from './star-rating.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

/**
 * Expected input:
 * {
 *   value: number,
 *   onChange: (value: number) => void,
 *   readonly?: boolean
 * }
 *
 * Steps to complete:
 * 1. Init constructor - define props type with value, onChange, readonly
 * 2. Provide template - render star buttons with proper attributes
 * 3. Handle click event - delegate click to update value
 * 4. Add ARIA attributes:
 *    Container:
 *    - role="radiogroup" — groups related radio-like controls so screen readers announce "radiogroup" when entering
 *    - aria-label="Star Rating" — provides an accessible name for the group (no visible label exists)
 *    - aria-readonly="true/false" — tells assistive tech whether the rating can be changed
 *    Each star button:
 *    - role="radio" — each star acts as a radio option within the group
 *    - aria-checked="true/false" — indicates which star is currently selected
 *    - aria-label="N Star(s)" — provides a meaningful label (e.g. "3 Stars") instead of just the emoji
 * 5. Add CSS styles for stars
 */

const STAR = '⭐️'
const STARS_COUNT = 5
type TProps = {}

export const StarRating = (props: TProps) => {
  return <div>TODO: Implement</div>
}
