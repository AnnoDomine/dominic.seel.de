import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ListInformation from "./list-information";

const meta: Meta<typeof ListInformation> = {
    component: ListInformation,
    title: "Molecules/ListInformation",
    argTypes: {
        onEdit: { action: "edited" },
    },
};

export default meta;
type Story = StoryObj<typeof ListInformation>;

export const Default: Story = {
    args: {
        label: "Name",
        value: "John Doe",
    },
};

export const WithLongText: Story = {
    args: {
        label: "Description",
        value: "This is a very long description that should wrap to multiple lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
};

export const Editable: Story = {
    args: {
        label: "Editable Field",
        value: "Initial Value",
        isEditable: true,
        onEdit: (newValue) => alert(`New Value: ${newValue}`),
    },
    render: (args) => {
        // This is a common pattern for editable components in Storybook
        // to manage their internal state and show changes
        const [currentValue, setCurrentValue] = useState(args.value);
        return (
            <ListInformation
                {...args}
                value={currentValue}
                onEdit={(newValue) => {
                    setCurrentValue(newValue);
                    args.onEdit?.(newValue);
                }}
            />
        );
    },
};

export const BooleanAsIconTrue: Story = {
    args: {
        label: "Is Active",
        value: true,
        booleanAsIcon: true,
    },
};

export const BooleanAsIconFalse: Story = {
    args: {
        label: "Is Staff",
        value: false,
        booleanAsIcon: true,
        booleanTrueIcon: <CheckTwoToneIcon color="success" />,
        booleanFalseIcon: <CloseTwoToneIcon color="error" />,
    },
};

export const WithMaxHeight: Story = {
    args: {
        label: "Scrollable Content",
        value: "Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10\nLine 11\nLine 12\nLine 13\nLine 14\nLine 15\nLine 16\nLine 17\nLine 18\nLine 19\nLine 20",
        maxHeight: true,
    },
    parameters: {
        chromatic: { delay: 500 }, // Give it time to render scrollbars for snapshot tests
    },
    decorators: [
        (Story) => (
            <div style={{ height: "200px", border: "1px solid lightgrey" }}>
                <Story />
            </div>
        ),
    ],
};
