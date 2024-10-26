import { Box, Dialog, Tabs } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { useState } from "react";

import { AuthModalOpenAtom } from "@/atoms/Auth";
import { SignIn } from "@/components/Auth/SignIn";
import { SignUp } from "@/components/Auth/SignUp";
import { StopKeyboardPropagation } from "@/components/Utils/StopKeyboardPropagation";

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const open = useAtomValue(AuthModalOpenAtom);

  return (
    <StopKeyboardPropagation>
      <Dialog.Root defaultOpen={false} open={open}>
        <Dialog.Content maxWidth="450px">
          <Tabs.Root defaultValue={"signin"}>
            <Tabs.List>
              <Tabs.Trigger value={"signin"} disabled={isLoading}>
                Sign In
              </Tabs.Trigger>
              <Tabs.Trigger value={"signup"} disabled={isLoading}>
                Sign Up
              </Tabs.Trigger>
            </Tabs.List>
            <Box pt={"3"}>
              <Tabs.Content value={"signin"}>
                <SignIn isLoading={isLoading} setIsLoading={setIsLoading} />
              </Tabs.Content>

              <Tabs.Content value={"signup"}>
                <SignUp isLoading={isLoading} setIsLoading={setIsLoading} />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Root>
    </StopKeyboardPropagation>
  );
};
