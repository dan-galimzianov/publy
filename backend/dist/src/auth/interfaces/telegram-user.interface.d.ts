export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
}
export interface TelegramInitData {
    user: TelegramUser;
    chat_instance?: string;
    chat_type?: string;
    auth_date: number;
    hash: string;
}
export interface AuthResponse {
    user: TelegramUser;
}
