export type Locale =
    | "ar-AE"
    | "de-DE"
    | "en-US"
    | "es-ES"
    | "es-MX"
    | "fr-FR"
    | "id-ID"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pl-PL"
    | "pt-BR"
    | "ru-RU"
    | "th-TH"
    | "tr-TR"
    | "vi-VN"
    | "zh-CN"
    | "zh-TW";

export type State = "OPEN" | "CLOSED";

export type Opaque<T, K extends string> = T & { __typename: K };

export type Base64 = Opaque<string, "base64">;

export type BooleanString = "true" | "false";
