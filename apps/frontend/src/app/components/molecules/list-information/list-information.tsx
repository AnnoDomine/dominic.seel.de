import { Divider, styled, Typography } from "@mui/material";
import clsx from "clsx";
import NavigationBack from "../navigation-back/navigation-back";

type Props = {
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

const ListInformation = ({ label, value, booleanAsIcon, booleanTrueIcon, booleanFalseIcon, maxHeight }: Props) => {
    return (
        <ListInformationContainer className={clsx({ "max-height": maxHeight })}>
            <ListInformationLabel>{label}</ListInformationLabel>
            <Divider orientation="vertical" flexItem />
            <ListInformationValue className={clsx({ "max-height": maxHeight })}>
                {booleanAsIcon && typeof value === "boolean"
                    ? value
                        ? booleanTrueIcon || "✔️"
                        : booleanFalseIcon || "❌"
                    : value}
            </ListInformationValue>
        </ListInformationContainer>
    );
};

export default ListInformation;
