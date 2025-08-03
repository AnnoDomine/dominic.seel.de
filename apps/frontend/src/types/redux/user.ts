export type LoginPayload = {
    email: string;
    password?: string; // Optional, falls wir später nur Token für Social Login senden
};

export type LoginResponse = {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
};

export type UserListItem = Pick<LoginResponse, "email" | "username"> & {
    id: number;
    date_joined: string;
    is_active: boolean;
    is_staff: boolean;
};

export type SingleUserItem = UserListItem & {
    first_name: string;
    last_name: string;
    last_login: string | null;
    is_superuser: boolean;
};
