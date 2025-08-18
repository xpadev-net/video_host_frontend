import { Tabs } from "radix-ui";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

interface TabSwitcherProps {
  tabs: TabItem[];
  defaultValue?: string;
}

export const TabSwitcher = ({ tabs, defaultValue }: TabSwitcherProps) => {
  return (
    <Tabs.Root defaultValue={defaultValue || tabs[0]?.value}>
      <Tabs.List className={"sticky top-0 z-10 bg-background flex flex-row"}>
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className="aria-selected:border-accent-track border-b-2 border-transparent rounded-b-none px-4"
            asChild
          >
            <Button variant={"ghost"}>{tab.label}</Button>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value}>
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
