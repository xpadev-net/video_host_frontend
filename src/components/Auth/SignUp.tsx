import {
  Button,
  Dialog,
  Flex,
  TextField,
  VisuallyHidden,
} from "@radix-ui/themes";
import { useSetAtom } from "jotai";
import { FC } from "react";
import { MdKey, MdMail, MdPerson, MdTag } from "react-icons/md";

import { AuthModalOpenAtom } from "@/atoms/Auth";

type Props = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const SignUp: FC<Props> = ({ isLoading, setIsLoading }) => {
  const setOpen = useSetAtom(AuthModalOpenAtom);
  return (
    <Flex gap={"2"} direction={"column"} mb={"2"}>
      <VisuallyHidden>
        <Dialog.Title>Sign Up</Dialog.Title>
        <Dialog.Description>Sign up for an account</Dialog.Description>
      </VisuallyHidden>
      <TextField.Root
        placeholder="username"
        required={true}
        disabled={isLoading}
      >
        <TextField.Slot>
          <MdTag />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        placeholder="display name"
        required={true}
        disabled={isLoading}
      >
        <TextField.Slot>
          <MdPerson />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        placeholder="password"
        required={true}
        type={"password"}
        disabled={isLoading}
      >
        <TextField.Slot>
          <MdKey />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        placeholder="invitation code (optional)"
        required={false}
        type={"password"}
        disabled={isLoading}
      >
        <TextField.Slot>
          <MdMail />
        </TextField.Slot>
      </TextField.Root>
      <Flex gap="3" justify="end">
        <Button
          variant="soft"
          color="gray"
          onClick={() => setOpen(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button loading={isLoading}>Sign Up</Button>
      </Flex>
    </Flex>
  );
};
