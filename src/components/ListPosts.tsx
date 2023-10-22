import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import useDeletePost from "../hooks/useDeletePost";
import useGetPosts from "../hooks/useGetPosts";
import useEditPostPartially  from "../hooks/useEditPostPartially";


const ListPosts = () => {

    const { isLoading, isError, data } = useGetPosts();
    const baseImgUrl = "localhost:3000/"
    const toast = useToast();

    // We'll show a toas message on success

    const onDeletionSuccess = () => {
        return toast({
          title: 'Post deleted.',
          description: "The post has been removed from the database",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
    }

    const onVisibilitySuccess = () => {
        return toast({
          title: 'Visibility edited successfuly.',
          description: "Post visibility has been toggled",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
    }

    const { isLoading: isDeleteLoading, isError: isDeleteError, mutate } = useDeletePost(onDeletionSuccess);
    const { mutate: mutatePost } = useEditPostPartially(onVisibilitySuccess)

    // Delete a post by id

    const deletePost = (postId: string) => {
        mutate(postId);
    }

    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8}>

            <Heading mb={"24"}> Posts </Heading>

            <SimpleGrid columns={2} spacing="5">

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

                            <Button variant='solid' colorScheme='red' onClick={() => deletePost(post.postId)}>
                                Delete
                            </Button>

                            <Button variant='outline' colorScheme='yellow' onClick={() => {
                                mutatePost({postId: post.postId, isHidden: !post.isHidden, isFirstPage: post.isFirstPage});
                            }}>
                                {post.isHidden == true ? <Text> Hidden </Text> : <Text> Hide </Text>}
                            </Button>

                            <Button variant='outline' colorScheme='green' onClick={() => {
                                mutatePost({postId: post.postId, isHidden: post.isHidden, isFirstPage: !post.isFirstPage})
                            }}>
                                { post.isFirstPage == true ? <Text> Not first page </Text> : <Text> First page </Text> }
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