export type LoginPayload = {
    email: string
    password?: string // Optional, falls wir später nur Token für Social Login senden
}

export type LoginResponse = {
    pk: number
    username: string
    email: string
    first_name?: string
    last_name?: string
}
