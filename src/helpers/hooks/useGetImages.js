import { useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { IMAGE_TYPE_PHOTO, IMAGES_NUMBER_OF_RETRIES, IMAGES_PER_PAGE } from "../../common/constants";


export const useGetImages = (searchTerm, shouldFetch = false) => {
  const [hasNext, setHasNext] = useState(false);

  const getKey = (pageIndex, previousPageData, searchTerm) => {
    if (!shouldFetch) return null;
    const maxPage = previousPageData ? Math.round(previousPageData.totalHits / IMAGES_PER_PAGE) : 1;
    const nextPage = pageIndex + 1;

    return nextPage <= maxPage ?
      // `${process.env.REACT_APP_PIXABAY_API_URL}?q=${searchTerm}&image_type=${IMAGE_TYPE_PHOTO}&page=${nextPage}`
      `${process.env.REACT_APP_PIXABAY_API_URL}?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${searchTerm}&image_type=${IMAGE_TYPE_PHOTO}&page=${nextPage}`
      : null;
  }

  const fetcher = (url) => fetch(url).then(res => res.json());

  const onSuccess = (data, key, config) => {
    setHasNext(size < Math.round(data[0].totalHits / IMAGES_PER_PAGE));
  }

  const options = {
    initialSize: 1,
    revalidateAll: false,
    persistSize: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    errorRetryCount: IMAGES_NUMBER_OF_RETRIES,
    onSuccess
  }

  const { data, error, size, setSize } = useSWRInfinite(
    (...args) => getKey(...args, searchTerm),
    fetcher,
    options
  );

  return { data, error, setSize, hasNext };
}

export default useGetImages;
