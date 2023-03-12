import { createTask, addTask, removeTask, tasksReducer } from "./tasks-slice";

describe("tasksSlice", () => {
  const initialState = {
    entities: [
      createTask({ title: "Drink water" }),
      createTask({ title: "Go for jog" }),
    ],
  };

  it(`should add a task when the ${addTask} is dispatched`, () => {
    const task = createTask({ title: "Sleep at 10 PM" });
    const action = addTask(task);

    const newState = tasksReducer(initialState, action);

    expect(newState.entities).toEqual([task, ...initialState.entities]);
  });

  it(`should remove the task when the ${removeTask} is dispatched`, () => {
    const taskToRemoveId = initialState.entities[0].id;
    const action = removeTask(taskToRemoveId);

    const newState = tasksReducer(initialState, action);

    expect(newState.entities).toEqual([...initialState.entities.slice(1)]);
  });
});