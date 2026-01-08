import { Component } from "../../utilities/component";
import flex from '@course/styles';
import cx from '@course/cx';
import css from './tabs.module.css';


export type TTabProps = {
    name: string;
    content: string;
};

export type TTabsProps = {
    target?: HTMLElement;
    defaultTab?: string;
    tabs: TTabProps[];
}

export class Tabs extends Component<TTabsProps> {
    #defaultTab: string | undefined;
    #contentContainer: HTMLElement | null = null;
    #activeTabName: string | undefined;

    init(): void {
        this.#defaultTab = this.config.defaultTab || this.config.tabs[0].name;
        this.config.root.addEventListener("click", this.#handleTabClick);
    }

    render(): void {
        this.init();
        this.config.root.innerHTML = this.toHTML();
        this.effect();
        this.#activateTab(this.#defaultTab!);
    }

    effect(): void {
        if (!this.config.target) {
            this.#contentContainer = this.config.root.querySelector(`.${css.container}`);
        }
    }

    destroy(): void {
        this.config.root.removeEventListener("click", this.#handleTabClick);
        this.config.root.innerHTML = "";
        this.#contentContainer = null;
    }

    toHTML(): string {
        const { className, target } = this.config;
        const contentHtml = target ? "" : `<section class="${css.container}"></section>`;

        return `
            <nav class="${className || ''}">
                <ul class="${cx(flex.flexRowStart, flex.flexGap16)}">
                    ${this.#getTabs()}
                </ul>
            </nav>
            ${contentHtml}
        `;
    }

    #handleTabClick = (event: MouseEvent): void => {
        const target = event.target as HTMLElement;
        const button = target.closest("button");

        if (!button) return;

        const tabName = button.dataset.tabName;
        if (tabName && tabName !== this.#activeTabName) {
            this.#activateTab(tabName);
        }
    };

    #activateTab(tabName: string): void {
        const tab = this.config.tabs.find((t) => t.name === tabName);
        if (!tab) return;

        this.#activeTabName = tabName;
        const { content } = tab;

        // Update target container (external or internal)
        const container = this.config.target || this.#contentContainer;
        if (container) {
            container.innerHTML = content;
        }
    }

    #getTabs(): string {
        const { tabs } = this.config;
        return tabs
            .map(
                (tab) =>
                    `<li><button data-tab-name="${tab.name}">${tab.name}</button></li>`
            )
            .join("");
    }
}
