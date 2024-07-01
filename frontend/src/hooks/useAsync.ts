// src/hooks/useAsync.ts
import { useState, useEffect } from 'react';

type AsyncState<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = []
): AsyncState<T> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {

    console.log("executando");
    const execute = async () => {
      try {
        const result = await asyncFunction();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    execute();
  }, dependencies);

  return { loading, data, error };
};

export default useAsync;
