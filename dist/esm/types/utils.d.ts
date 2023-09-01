export declare type State = "OPEN" | "CLOSED";
export declare type Opaque<T, K extends string> = T & {
    __typename: K;
};
export declare type Base64 = Opaque<string, "base64">;
export declare type BooleanString = "true" | "false";
//# sourceMappingURL=utils.d.ts.map