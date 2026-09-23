export function logout(router: any) {
  localStorage.removeItem("cyberAuth");
  localStorage.removeItem("cyberRole");
  localStorage.removeItem("cyberUser");
  localStorage.removeItem("cyberAdminAuth");
  localStorage.removeItem("cyberAdminUser");

  document.cookie = "cyberAuth=; path=/; max-age=0";
  document.cookie = "cyberRole=; path=/; max-age=0";

  router.push("/login");
}

export function getRole(): "admin" | "user" | null {
  if (typeof window === "undefined") return null;
  const role = localStorage.getItem("cyberRole");
  if (role === "admin" || role === "user") return role;
  return null;
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cyberAuth") === "true";
}