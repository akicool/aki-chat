import { memo, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Avatar, Center, Group, Loader, Modal, Text, rem } from "@mantine/core";
import { Spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";

import { Input } from "./Inputs/Input";

type ModalProps = {
  opened: boolean;
  close: () => void;
};

const getUsers = async () => {
  return axios
    .get("/api/getUsers")
    .then((res) => res?.data?.getAllUsers)
    .catch((err) => console.log(err));
};

export const UserSearchPanel = () => {
  const [showingUsers, setShowingUsers] = useState([]);
  // const [searchValue, setSearchingValue] = useState("");

  useEffect(() => {
    (async () => {
      const allUsers = await getUsers();
      setShowingUsers(allUsers);
    })();
  }, []);

  const router = useRouter();

  // const handleSearchUser = useMemo(() => {
  //   if (searchValue?.trim() == "") {
  //     return showingUsers;
  //   }

  //   return showingUsers?.filter((user: { username: string }) =>
  //     user?.username?.includes(searchValue),
  //   );
  // }, [showingUsers, searchValue]);

  const actions = showingUsers?.map(({ _id, username, email }) => {
    return {
      id: _id,
      label: username,
      description: email,
      // TODO: added channel logic
      // onClick: () => router.push(`/main-conversation/${_id}`),
    };
  });
  console.log(actions);

  return (
    // <Modal
    //   opened={opened}
    //   onClose={close}
    //   title="New chat"
    //   centered
    //   radius={16}
    //   size="xl"
    //   className="self"
    // >
    //   <div className=" w-full">
    //     <Input inModal onChange={(e) => setSearchingValue(e.target.value)} />
    //   </div>
    //   <div className="grid h-4/6 w-full space-y-2 overflow-auto">
    //     {handleSearchUser?.map(({ _id, username }, idx) => (
    //       <div
    //         key={_id}
    //         className="flex h-fit w-full items-center gap-5 rounded-xl bg-slate-200 px-3 py-4"
    //       >
    //         <Avatar />
    //         {username}
    //       </div>
    //     ))}
    //   </div>
    // </Modal>

    <Spotlight
      actions={actions}
      nothingFound="Nothing found..."
      highlightQuery
      className="self"
      searchProps={{
        leftSection: (
          <IconSearch
            style={{ width: rem(20), height: rem(20) }}
            stroke={1.5}
          />
        ),
        placeholder: "Search...",
      }}
    />
  );
};
