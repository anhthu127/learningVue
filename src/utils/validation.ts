/**
 * validate email
 * @param string email
 * @return boolean
 */
export function isValidEmail(email: string): boolean {
  const regex =
    /^\w+([+])*([.-]?\w+([+])*)*@\w+([+])*([.-]?\w+([+])*)*(\.\w{2,3})+$/;
  return regex.test(email);
}
