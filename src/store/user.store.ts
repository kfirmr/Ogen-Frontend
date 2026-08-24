import { create } from "zustand";

interface IUserState {
  name: string;
}

const DEFAULT_USER_NAME = "נועה";

export const userStore = create<IUserState>(() => ({
  name: DEFAULT_USER_NAME,
}));

export const getUserName = () => userStore.getState().name;

export const setUserName = (name: string) => userStore.setState({ name });
