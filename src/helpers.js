export function calculateYears(startDate) {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  const hasNotHadBirthdayThisYear =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());

  if (hasNotHadBirthdayThisYear) {
    years--;
  }

  return years;
}
