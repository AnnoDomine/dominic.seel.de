import EditOffTwoToneIcon from "@mui/icons-material/EditOffTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import { Divider, IconButton, OutlinedInput, styled, Typography } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";

type EditableProps<T extends boolean = boolean> = T extends true
    ? { isEditable: true; onEdit: (value: string) => void }
    : { isEditable?: boolean; onEdit?: (value: string) => void };

type Props<T extends boolean = false> = EditableProps<T> & {
    label: string;
    value: React.ReactNode;
    booleanAsIcon?: boolean;
    booleanTrueIcon?: React.ReactNode;
    booleanFalseIcon?: React.ReactNode;
    maxHeight?: boolean;
};

const ListInformationContainer = styled("div")({
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    alignItems: "center",
    "&.max-height": {
        height: "100%",
    },
});

const ListInformationLabel = styled(Typography)({
    fontWeight: "bold",
    width: "150px",
    minWidth: "150px",
    textAlign: "right",
    marginRight: "0px",
});

const ListInformationValue = styled(Typography)({
    marginLeft: "0px",
    width: "100%",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    "&.max-height": {
        height: "100%",
        overflow: "auto",
    },
});

const ListInformation = <T extends boolean = false>({
    label,
    value,
    booleanAsIcon,
    booleanTrueIcon,
    booleanFalseIcon,
    maxHeight,
    isEditable,
    onEdit,
}: Props<T>) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingValue, setEditingValue] = useState<string>((value || "").toString());

    const editable = isEditable || false;
    const handleEdit = onEdit || (() => null);

    const toggleEditMode = () => {
        setIsEditing((p) => !p);
    };

    const cancleEdit = () => {
        setEditingValue((value || "").toString());
        toggleEditMode();
    };

    const confirmEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        handleEdit(editingValue.trim());
        toggleEditMode();
    };

    return (
        <ListInformationContainer className={clsx({ "max-height": maxHeight })}>
            <ListInformationLabel>{label}</ListInformationLabel>
            <Divider orientation="vertical" flexItem />
            {isEditing ? (
                <OutlinedInput
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    fullWidth
                    sx={{
                        height: "30px",
                    }}
                />
            ) : (
                <ListInformationValue className={clsx({ "max-height": maxHeight })}>
                    {booleanAsIcon && typeof value === "boolean"
                        ? value
                            ? booleanTrueIcon || "✔️"
                            : booleanFalseIcon || "❌"
                        : value || "-"}
                </ListInformationValue>
            )}
            {editable && (
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {isEditing ? (
                        <>
                            <IconButton
                                size="small"
                                onClick={confirmEdit}
                                disabled={editingValue === (value || "").toString() || !editingValue}
                            >
                                <SaveAsTwoToneIcon fontSize="small" color="success" />
                            </IconButton>
                            <IconButton size="small" onClick={cancleEdit}>
                                <EditOffTwoToneIcon fontSize="small" color="error" />
                            </IconButton>
                        </>
                    ) : (
                        <IconButton size="small" onClick={toggleEditMode}>
                            <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                    )}
                </div>
            )}
        </ListInformationContainer>
    );
};

export default ListInformation;
