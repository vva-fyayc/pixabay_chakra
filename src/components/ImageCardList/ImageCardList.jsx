import React from 'react';
import useStore from '../../store';
import ImageCard from '../ImageCard';
import { WrapItem } from '@chakra-ui/react';

const ImageCardList = () => {
    const imageData = useStore(state => state.imageData);

    if (!imageData) return null;

    const list = imageData.map(page => {
        return page.hits.map(image => {
            return (
                <WrapItem key={image.id}>
                    <ImageCard image={image} />
                </WrapItem>
            );
        });
    });

    return list;
}

export default ImageCardList;
