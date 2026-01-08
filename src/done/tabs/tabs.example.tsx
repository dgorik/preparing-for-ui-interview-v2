import { useRef, useEffect } from "react";
import { Tabs, Tab } from "./tabs.react";
import { Tabs as VanillaTabs } from "./tabs";
import flex from "@course/styles";

export function TabsExample() {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!rootRef.current) return;

        const tabs = new VanillaTabs({
            root: rootRef.current,
            className: '',
            tabs: [
                { name: 'Tab 1', content: '<div>Content 1</div>' },
                { name: 'Tab 2', content: '<div>Content 2</div>' },
            ]
        });

        tabs.render();

        return () => tabs.destroy();
    }, []);

    return <div className={flex.flexColumnGap16}>
        <section>
            <h3>React Version</h3>
            <Tabs defaultTab="Tab 1">
                <Tab name="Tab 1">Content 1</Tab>
                <Tab name="Tab 2">Content 2</Tab>
                <Tab name="Tab 3">Content 3</Tab>
            </Tabs>
        </section>
        <section>
            <h3>Vanilla Version</h3>
            <div ref={rootRef}></div>
        </section>
    </div>
}
