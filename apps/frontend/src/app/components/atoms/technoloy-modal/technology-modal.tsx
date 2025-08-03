import { createSvgIcon, Dialog, DialogActions, DialogContent, DialogTitle, styled, Typography } from "@mui/material";
import { technologyIcons } from "@utils";
import { useState } from "react";
import type { TechnologyListItem } from "../../../../types/redux/technology";
import ListInformation from "../../molecules/list-information/list-information";

const ChatGPTLogo = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        role="img"
        aria-label="ChatGPT Logo"
    >
        <path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z" />
    </svg>,
    "ChatGPTLogo"
);

const GeminiLogo = createSvgIcon(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Gemini Logo">
        <title>Gemini</title>
        <path
            d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
            fill="#3186FF"
        />
        <path
            d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
            fill="url(#lobe-icons-gemini-fill-0)"
        />
        <path
            d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
            fill="url(#lobe-icons-gemini-fill-1)"
        />
        <path
            d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
            fill="url(#lobe-icons-gemini-fill-2)"
        />
        <defs>
            <linearGradient
                gradientUnits="userSpaceOnUse"
                id="lobe-icons-gemini-fill-0"
                x1="7"
                x2="11"
                y1="15.5"
                y2="12"
            >
                <stop stop-color="#08B962" />
                <stop offset="1" stop-color="#08B962" stop-opacity="0" />
            </linearGradient>
            <linearGradient
                gradientUnits="userSpaceOnUse"
                id="lobe-icons-gemini-fill-1"
                x1="8"
                x2="11.5"
                y1="5.5"
                y2="11"
            >
                <stop stop-color="#F94543" />
                <stop offset="1" stop-color="#F94543" stop-opacity="0" />
            </linearGradient>
            <linearGradient
                gradientUnits="userSpaceOnUse"
                id="lobe-icons-gemini-fill-2"
                x1="3.5"
                x2="17.5"
                y1="13.5"
                y2="12"
            >
                <stop stop-color="#FABC12" />
                <stop offset=".46" stop-color="#FABC12" stop-opacity="0" />
            </linearGradient>
        </defs>
    </svg>,
    "GeminiLogo"
);

type Props = {
    technology: TechnologyListItem;
};

const Anchor = styled("a")({
    color: "inherit",
    textDecoration: "none",
    padding: "0 4px",
    gap: "4px",
    display: "flex",
    alignItems: "center",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
    },
});

const TechnologyContainer = styled("div")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px",
    height: "20px",
});

const TechnologyModal = ({ technology }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const TechnologyIcon = technology.name in technologyIcons ? technologyIcons[technology.name].Icon : null;
    const handleIconClick = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.stopPropagation();
        setIsOpen(true);
    };
    return (
        <TechnologyContainer>
            <div
                role="none"
                key={technology.id}
                onClick={handleIconClick}
                style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleIconClick(e);
                    }
                }}
            >
                {TechnologyIcon && (
                    <TechnologyIcon
                        style={{
                            width: "100%",
                            height: "100%",
                            paddingRight: "8px",
                        }}
                    />
                )}
                {technology.human_readable_name}
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md">
                <DialogTitle>
                    {TechnologyIcon && (
                        <TechnologyIcon
                            style={{
                                width: "100%",
                                height: "100%",
                                paddingRight: "8px",
                            }}
                        />
                    )}
                    {technology.human_readable_name}
                </DialogTitle>
                <DialogContent>
                    <ListInformation label="Description" value={technology.description} />
                </DialogContent>
                <DialogActions>
                    <Typography
                        variant="caption"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "8px",
                            color: "text.secondary",
                            fontSize: "0.75rem",
                        }}
                    >
                        Technology information generated by
                        <Anchor href="https://www.chatgpt.com" target="_blank" rel="noopener noreferrer">
                            <ChatGPTLogo style={{ fontSize: "inherit" }} />
                            ChatGPT<sup>™</sup>
                        </Anchor>
                        and
                        <Anchor href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer">
                            <GeminiLogo style={{ fontSize: "inherit" }} /> Gemini<sup>™</sup>
                        </Anchor>
                    </Typography>
                </DialogActions>
            </Dialog>
        </TechnologyContainer>
    );
};

export default TechnologyModal;
