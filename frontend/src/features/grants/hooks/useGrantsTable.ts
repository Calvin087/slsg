export const useGrantTable = () => {
  const getDaysLeft = (deadline: string) =>
    Math.ceil(
      (new Date(deadline).getTime() - new Date().setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24),
    );

  return { getDaysLeft };
};
