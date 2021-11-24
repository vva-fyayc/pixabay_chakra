import React from 'react';
import { useRecoilState } from 'recoil';
import imageData from '../../state/atoms/imageData';
import ImageCard from '../ImageCard';
import { WrapItem } from '@chakra-ui/react';

const ImageCardList = () => {
    const [data] = useRecoilState(imageData);

    if(!data) return null;

    const list = data.map(page => {
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
