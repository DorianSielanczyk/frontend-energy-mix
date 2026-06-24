export const handleApiError = async (response: Response) => {
  const errorData = await response.json().catch(() => null);

  if (errorData && errorData.detail) {
    throw new Error(errorData.detail);
  }

  throw new Error("Wystąpił nieoczekiwany błąd komunikacji z serwerem.");
};
