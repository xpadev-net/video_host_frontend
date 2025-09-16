import { AuthButton } from "src/components/App/Header/Auth";
import { Search } from "@/components/App/Header/Search";
import { ToggleTheme } from "@/components/App/Header/Theme";
import { HeaderMenu } from "@/components/App/Menu";

type props = {
  className?: string;
};

const DesktopHeader = ({ className }: props) => {
  return (
    <header
      className={`${className} px-4 flex flex-row items-center justify-between`}
    >
      <div className="w-[169px]">
        <HeaderMenu />
      </div>
      <div className="flex-[0_1_728px] min-w-0 px-10">
        <Search />
      </div>
      <div className="w-[225px] flex justify-end gap-1">
        <ToggleTheme />
        <AuthButton />
      </div>
    </header>
  );
};

export { DesktopHeader };
