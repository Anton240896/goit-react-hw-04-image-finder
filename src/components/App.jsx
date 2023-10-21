import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { fetchRequestApi } from './Api/Api';

import { AppWrapper } from './Layout';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { SearchBarContainer } from './Searchbar/SearchBar';

//      /*======== HOOKS =========*/

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  // const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  //   /*======= QUERY SEARCHBAR ========*/

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  //   /*=========== LOAD-MORE BUTTON + 1 PAGE =============*/

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  //   /*=========== GET API REQUEST =============*/

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getRequestApi() {
      try {
        setLoading(true);
        setError(false);
        const responseData = await fetchRequestApi(page, query);

        if (responseData.hits.length === 0) {
          toast.error(' 🥺! Sorry, no images found, please try again!');
        }
        if (responseData.hits.length !== 0) {
          toast.success(`'😊! We found ${responseData.totalHits} images'`);
        }

        setImages(prevImages => [...prevImages, ...responseData.hits]);
        setShowBtn(page < Math.ceil(responseData.totalHits / 12));
      } catch {
        setError(true);
        toast.error(' 🥺! Sorry, no images found, please try again!');
      } finally {
        setLoading(false);
      }
    }

    getRequestApi();
  }, [page, query]);

  //   /*======== RENDER ========*/
  return (
    <AppWrapper>
      <SearchBarContainer onSubmit={handleSubmit} />

      {loading && <Loader />}
      {error && toast.error(' 🥺! Sorry, no images found, please try again!')}

      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            padding: 100,
            color: 'darkblue',
            textAlign: 'center',
            fontSize: 60,
          }}
        >
          No photos at the moment ... 🥺
        </p>
      )}

      {showBtn && <Button onLoadMore={handleLoadMore}>Load more</Button>}

      <Toaster position="top-right" />
    </AppWrapper>
  );
};
