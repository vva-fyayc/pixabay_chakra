import { useState, useEffect } from 'react';
import { FormControl, FormErrorMessage, Input, Button, Center, Box, Text, HStack, VStack, Container, Wrap } from '@chakra-ui/react';
import useGetImages from '../helpers/hooks/useGetImages';
import useStore from '../store';
import ImageCardList from '../components/ImageCardList/ImageCardList';
import SearchInfo from '../components/SearchInfo';

const ImageContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [oldSearchTerm, setOldSearchTerm] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const setImageData = useStore(state => state.setImageData);

  const { data, error, setSize, hasNext } = useGetImages(oldSearchTerm, shouldFetch);
  
  useEffect(() => {
    setImageData(data);
  }, [data, setImageData]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSize(1);
    setOldSearchTerm(searchTerm);
    setShouldFetch(true);
  }

  

  if (error) return <p>Server error</p>

  return (
    <Container maxWidth="180ch">
      <VStack spacing="24px">

        <Center height="100px">
          <form onSubmit={handleSubmit}>

            <HStack spacing="24px">
              <FormControl isRequired>
                <Input value={searchTerm} onChange={handleChange} type="text" size="lg" placeholder="Enter a word..." />
                <FormErrorMessage>Please enter a search term.</FormErrorMessage>
              </FormControl>

              <Button size="lg" type="submit">GO</Button>
            </HStack>

          </form>
        </Center>

        <Box>
          <SearchInfo searchTerm={oldSearchTerm} />
        </Box>

        <Wrap justify="center">
          <ImageCardList />
        </Wrap>

        <Box>
          {hasNext && <Button size="lg" onClick={() => setSize(size => size + 1)}>Load More</Button>}
        </Box>

        <Box>
          <Text mb="30px" fontSize="4xl" align="center">All images are provided by <a href={process.env.REACT_APP_PIXABAY_URL} target="_blank" rel="noreferrer">Pixabay</a>.</Text>
        </Box>

      </VStack>
    </Container>
  );
}

export default ImageContainer;
