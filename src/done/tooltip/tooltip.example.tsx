import { Tooltip } from "./tooltip.react";
import flex from '@course/styles';
import cx from '@course/cx';

export function TooltipExample() {
    return (
        <div className={cx(flex.flexColumnCenter, flex.flexGap24, flex.paddingVer32, flex.paddingHor32)}>
            <div className={cx(flex.flexRowCenter, flex.flexGap32)}>
                <Tooltip position="top" content="Top tooltip">
                    <button>Top</button>
                </Tooltip>
                <Tooltip position="auto" content="Top tooltip">
                    <button>Auto</button>
                </Tooltip></div>

            <div className={cx(flex.flexRowCenter, flex.flexGap32)}>
                <Tooltip position="left" content="Left tooltip">
                    <button>Left</button>
                </Tooltip>
                <Tooltip position="right" content="Right tooltip">
                    <button>Right</button>
                </Tooltip>
            </div>
            <Tooltip position="bottom" content="Bottom tooltip">
                <button>Bottom</button>
            </Tooltip>
        </div>
    );
}
