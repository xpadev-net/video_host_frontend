import { atomWithStorage } from "jotai/utils";

import { SidebarState } from "@/@types/SidebarState";

const sidebarState = atomWithStorage<SidebarState>("SidebarState", false);

export { sidebarState };
