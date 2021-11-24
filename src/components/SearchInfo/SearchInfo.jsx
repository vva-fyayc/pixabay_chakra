import React from 'react';
import useStore from '../../store';
import { Text } from '@chakra-ui/react';


const SearchInfo = ({ searchTerm }) => {
    const imageData = useStore(state => state.imageData);

    if (!imageData) return null;

    const searchInfo = () => {
        switch (imageData[0].totalHits) {
            case 0:
                return `No image where found for ${searchTerm}`;
            case 1:
                return `You can see 1 image for ${searchTerm}`;
            default:
                return `You can see ${imageData[0].totalHits} images for ${searchTerm}`;
        }
    }

    return (
        <Text mb="30px" fontSize="4xl" align="center">{searchInfo()}</Text>
    );
}

export default SearchInfo;
