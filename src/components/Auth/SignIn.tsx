import {
  Button,
  Callout,
  Dialog,
  Flex,
  TextField,
  VisuallyHidden,
} from "@radix-ui/themes";
import { useSetAtom } from "jotai";
import { type FC, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdKey, MdTag } from "react-icons/md";

import { AuthModalOpenAtom, AuthTokenAtom } from "@/atoms/Auth";
import { requests } from "@/libraries/requests";
import { postAuth } from "@/service/postAuth";

type Props = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const SignIn: FC<Props> = ({ isLoading, setIsLoading }) => {
  const setOpen = useSetAtom(AuthModalOpenAtom);
  const setAuthToken = useSetAtom(AuthTokenAtom);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setIsLoading(true);
    const token = await postAuth(username, password);
    if (token.data.status === "ok") {
      requests.defaults.headers.Authorization = `Bearer ${token.data.data}`;
      setAuthToken(token.data.data);
      setOpen(false);
    } else {
      setError(token.data.message);
    }
    setIsLoading(false);
  };

  return (
    <Flex gap={"2"} direction={"column"} mb={"2"}>
      <VisuallyHidden>
        <Dialog.Title>Sign In</Dialog.Title>
        <Dialog.Description>Sign in to your account</Dialog.Description>
      </VisuallyHidden>
      {error && (
        <Callout.Root color={"red"}>
          <Callout.Icon>
            <IoMdInformationCircleOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <TextField.Root
        placeholder="username"
        required={true}
        disabled={isLoading}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      >
        <TextField.Slot>
          <MdTag />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        placeholder="password"
        required={true}
        type={"password"}
        disabled={isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        <TextField.Slot>
          <MdKey />
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
        <Button loading={isLoading} onClick={() => void handleSignIn()}>
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
};
