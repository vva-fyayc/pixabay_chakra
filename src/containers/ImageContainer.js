import { useState } from 'react';
import { FormControl, FormErrorMessage, Input, Button, Center, Box, Text, HStack, VStack, Container, Wrap, WrapItem } from "@chakra-ui/react";
import ImageCard from '../components/ImageCard';
import useGetImages from '../helpers/hooks/useGetImages';

const ImageContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [val, setVal] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, error, setSize, hasNext } = useGetImages(val, shouldFetch);
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSize(1);
    setVal(searchTerm);
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
          {data && <Text mb="30px" fontSize="4xl" align="center">You can see {data[0].totalHits} images for {val}</Text>}
        </Box>

        <Wrap justify="center">
          {data && data.map(page => {
            return page.hits.map(image => {
              return (
                <WrapItem key={image.id}>
                  <ImageCard image={image} />
                </WrapItem>
              );
            })
          })}
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
