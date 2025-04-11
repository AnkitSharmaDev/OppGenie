export const generateFallbackLogo = (organization: string) => {
  const letter = organization.charAt(0).toUpperCase();
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="${color}"/><text x="20" y="20" text-anchor="middle" dy="7" fill="white" font-family="Arial" font-size="20">${letter}</text></svg>`;
}; 