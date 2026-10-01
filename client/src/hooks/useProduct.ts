import { useState, useEffect } from 'react';
import { Product } from '../types';
import { productService } from '../services/productService';

export function useProduct(slug?: string, id?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function fetchItem() {
      if (!slug && !id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        let result: Product | null = null;
        if (slug) {
          result = await productService.getProductBySlug(slug);
        } else if (id) {
          result = await productService.getProductById(id);
        }

        if (isCurrent) {
          if (!result) {
            setError('Product not found');
          } else {
            setProduct(result);
          }
        }
      } catch (err: unknown) {
        if (isCurrent) {
          setError(err instanceof Error ? err.message : 'Error fetching product');
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    fetchItem();

    return () => {
      isCurrent = false;
    };
  }, [slug, id]);

  return { product, isLoading, error };
}
