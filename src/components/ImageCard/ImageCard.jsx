import React from 'react';
import { Box, Image, Text, Avatar } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

const ImageCard = ({ image }) => {
    return (
        <Box
            maxW="300px"
            height="460px"
            p="16px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
        >
            <Image
                boxSize="300px"
                objectFit="cover"
                src={image.previewURL}
                alt={image.tags}
            />

            <Box>
                <Flex mt="16px" alignItems="center">
                    <Text fontSize="2xl">By {image.user.length > 12 ? `${image.user.slice(0, 12)}...` : image.user}</Text>
                    <Spacer />
                    <Avatar src={image.userImageURL} alt={image.user} />
                </Flex>
                <Text fontSize="xl">Tags: {image.tags.length > 42 ? `${image.tags.slice(0, 42)}...` : image.tags}</Text>
            </Box>
        </Box>
    );
}

export default ImageCard;
