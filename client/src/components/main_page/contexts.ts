import { createContext } from "react";

export const MainContext = createContext<{
  user_name: string,
  group_id: string,
  group_name: string,
  set_group: (id: string, name: string) => void,
  unset_group: () => void,
}>(null);
