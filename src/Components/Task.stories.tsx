import React from 'react';
import {Task} from "./Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Provider} from "react-redux";
import {store} from "../State/store";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TodoList/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: {control: 'color'},
    },
    args: {
        taskId: '1',
        isDone: false,
        title: 'Task',
        listId: '1'
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Provider store={store}><Task {...args} /></Provider>;

export const UncheckedTask = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

