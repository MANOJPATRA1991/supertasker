import { useMemo } from "react";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { ApplicationDispatch, ApplicationState } from "./store";

export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;

export const useAppDispatch: () => ApplicationDispatch = useDispatch;

export const useTasks = () => {
  const tasks = useAppSelector(state => state.tasks.entities);
  const loading = useAppSelector(state => !!state.tasks.loading);

  return useMemo(() => [tasks, loading] as const, [tasks, loading]);
};
