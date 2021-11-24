import React from 'react';
import { Text } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import imageData from '../../state/atoms/imageData';

const SearchInfo = ({ searchTerm }) => {
    const [data] = useRecoilState(imageData);


    if (!data) return null;

    const searchInfo = () => {
        switch (data[0].totalHits) {
            case 0:
                return `No image where found for ${searchTerm}`;
            case 1:
                return `You can see 1 image for ${searchTerm}`;
            default:
                return `You can see ${data[0].totalHits} images for ${searchTerm}`;
        }
    }

    return (
        <Text mb="30px" fontSize="4xl" align="center">{searchInfo()}</Text>
    );
}

export default SearchInfo;