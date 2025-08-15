import { useSetAtom } from "jotai";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/router";
import { AuthTokenAtom } from "@/atoms/Auth";
import { Button } from "@/components/ui/button";
import { useSelf } from "@/hooks/useUser";
import { deleteAuth } from "@/service/deleteAuth";

const AuthButton = () => {
  const user = useSelf();
  const router = useRouter();
  const setAuthToken = useSetAtom(AuthTokenAtom);

  if (user.data?.status === "ok" && user.data.data) {
    return (
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          void deleteAuth().then(() => {
            setAuthToken(null);
            location.reload();
          });
        }}
        className="cursor-pointer"
      >
        <LogOut />
      </Button>
    );
  }
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        void router.push("/login");
      }}
      size={"icon"}
      className="cursor-pointer"
    >
      <LogIn />
    </Button>
  );
};

export { AuthButton };
