import {
  Button,
  Callout,
  Dialog,
  Flex,
  TextField,
  VisuallyHidden,
} from "@radix-ui/themes";
import { useSetAtom } from "jotai";
import { FC, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdKey, MdMail, MdPerson, MdTag } from "react-icons/md";

import { AuthModalOpenAtom, AuthTokenAtom } from "@/atoms/Auth";
import { requests } from "@/libraries/requests";
import { postUsers } from "@/service/postUsers";

type Props = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const SignUp: FC<Props> = ({ isLoading, setIsLoading }) => {
  const setOpen = useSetAtom(AuthModalOpenAtom);
  const setAuthToken = useSetAtom(AuthTokenAtom);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setIsLoading(true);
    const res = await postUsers(
      username,
      displayName,
      password,
      invitationCode,
    );
    if (res.data.status === "ok") {
      requests.defaults.headers["Authorization"] =
        `Bearer ${res.data.data.token}`;
      setAuthToken(res.data.data.token);
      setOpen(false);
    } else {
      setError(res.data.message);
    }
    setIsLoading(false);
  };

  return (
    <Flex gap={"2"} direction={"column"} mb={"2"}>
      <VisuallyHidden>
        <Dialog.Title>Sign Up</Dialog.Title>
        <Dialog.Description>Sign up for an account</Dialog.Description>
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
        placeholder="display name"
        required={true}
        disabled={isLoading}
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
        value={invitationCode}
        onChange={(e) => setInvitationCode(e.target.value)}
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
        <Button loading={isLoading} onClick={() => void handleSignUp()}>
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};
