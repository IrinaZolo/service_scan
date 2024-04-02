export const formattedInnValue = (value: string): string => {
  if (!value) return value;
  const innNumber = value.replace(/[^\d]/g, "");
  if (innNumber.length < 3) {
    return `${innNumber}`;
  }
  if (innNumber.length < 6) {
    return `${innNumber.slice(0, 2)} ${innNumber.slice(2)}`;
  }
  if (innNumber.length < 9) {
    return `${innNumber.slice(0, 2)} ${innNumber.slice(2, 5)} ${innNumber.slice(
      5
    )}`;
  }
  if (innNumber.length > 10) {
    return `${innNumber.slice(0, 2)} ${innNumber.slice(2, 5)} ${innNumber.slice(
      5,
      8
    )} ${innNumber.slice(8, 10)}`;
  }
  return `${innNumber.slice(0, 2)} ${innNumber.slice(2, 5)} ${innNumber.slice(
    5,
    8
  )} ${innNumber.slice(8)}`;
};
