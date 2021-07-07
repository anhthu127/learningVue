import { STORAGE } from "@/config/constants";

/**
 * Get token cookie
 * @returns string|null token
 */
export function getToken(): string | null {
  return localStorage.getItem(STORAGE.TOKEN);
}

/**
 * Set token cookie
 * @param string token
 * @returns void
 */
export function setToken(token: string): void {
  localStorage.setItem(STORAGE.TOKEN, token);
}

/**
 * Delete token cookie
 * @returns void
 */
export function deleteToken(): void {
  localStorage.removeItem(STORAGE.TOKEN);
}
