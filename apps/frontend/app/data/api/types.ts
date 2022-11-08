export type ResponseError = {
  ok: false;
  error: Error;
};

export const isResponseError = (
  response: unknown
): response is ResponseError => {
  if (typeof response === "object" && response) {
    return "error" in response;
  }

  return true;
};
