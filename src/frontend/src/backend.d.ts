import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ModIdea {
    id: bigint;
    title: string;
    createdAt: Time;
    tags: Array<string>;
    description: string;
    author?: Principal;
    gamePlatform: string;
}
export type Time = bigint;
export interface backendInterface {
    createModIdea(title: string, description: string, gamePlatform: string, tags: Array<string>): Promise<bigint>;
    getAllModIdeas(): Promise<Array<ModIdea>>;
    getModIdea(id: bigint): Promise<ModIdea>;
}
