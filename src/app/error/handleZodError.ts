 import type { ZodError } from 'zod';
import type { TErrorSources, TGenericErrorResponse } from '../interface/error.js';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodError['issues'][number]) => {
    const lastPath = issue.path[issue.path.length - 1];

    return {
      path: typeof lastPath === 'string' || typeof lastPath === 'number' ? lastPath : 'unknown',
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;

