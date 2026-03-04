import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PublicModData {
    features: Array<string>;
    name: string;
    createdAt: Time;
    authorName: string;
    description: string;
    category: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllMods(): Promise<Array<PublicModData>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Save a new mod (no authentication required).
     * / All mods are stored and accessible publicly.
     */
    saveMod(name: string, description: string, features: Array<string>, authorName: string, category: string): Promise<void>;
}
