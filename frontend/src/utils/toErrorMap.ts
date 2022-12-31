export const toErrorMap = (errors: { field: string; message: string}[]) => {
  const errorMap = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
