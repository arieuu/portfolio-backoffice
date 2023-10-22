import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Image, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react";
import useGetPosts from "../hooks/useGetPosts";
import useGetOnePost from "../hooks/useGetOnePost";


const ListPosts = () => {

    const { isLoading, isError, data } = useGetPosts();
    const baseImgUrl = "localhost:3000/"
    // const {isLoading, isError, data } = useGetOnePost("82d5d3c0-950b-4d26-8775-6e3ddf55c404");

    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8}>

            <Heading mb={"24"}> Posts </Heading>

            <SimpleGrid columns={3} spacing="5">

                {data?.map(post => {
                return <Card minW='md' key={post.postId}>
                    <CardBody>
                        <Image
                        src={"http://" + baseImgUrl + post.imageUrl}
                        borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                        <Heading size='md'> {post?.title} </Heading>
                        <Text>
                            {post?.description}
                        </Text>

                       <Text>
                            {post?.more}
                        </Text>

                        <SimpleGrid columns={3}>
                            {post?.extraLinks.map(link => <a key={link.linkId} href={link.link} target="_blank"> {link.linkText} </a>)}
                        </SimpleGrid>

                        </Stack>
                    </CardBody>

                    <Divider />

                    <CardFooter>

                        <ButtonGroup spacing='2'>
                            <Button variant='solid' colorScheme='blue'>
                                Edit post 
                            </Button>

                            <Button variant='solid' colorScheme='red'>
                                Delete
                            </Button>

                            <Button variant='outline' colorScheme='red'>
                                Hide 
                            </Button>

                            <Button variant='outline' colorScheme='green'>
                                Show first page 
                            </Button>
                        </ButtonGroup>

                    </CardFooter>
                </Card>})
                }

            </SimpleGrid>
        </Flex>
    );
}

export default ListPosts;