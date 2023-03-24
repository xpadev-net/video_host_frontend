import {SidebarState} from "@/@types/SidebarState";
import {atomWithStorage} from "jotai/utils";

const sidebarState = atomWithStorage<SidebarState>("SidebarState",false);

export {sidebarState};