import { atomWithStorage } from "jotai/utils";

import type { SidebarState } from "@/@types/SidebarState";

const sidebarState = atomWithStorage<SidebarState>("SidebarState", false);

export { sidebarState };
