import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import useDeletePost from "../hooks/useDeletePost";
import useGetPosts from "../hooks/useGetPosts";
import useEditPostPartially  from "../hooks/useEditPostPartially";
import { useEffect, useState } from "react";


const ListPosts = () => {

    const { isLoading, isError, data } = useGetPosts();
    const baseImgUrl = "localhost:3000/"
    const toast = useToast();

    // Variables for button optimistic updates

    const [display, setDisplay] = useState<boolean[]>([]);

    /* We get the data from the database and fill up a state array with all the booleans saying whether a post
       is hidden or not. We use this state to change the button values immediately (optimistic update) to give the
       user a better experience.

       The buttons will check the state variables instead of the data itself coming from the database. That way we
       can update things immediately  */

    if(display.length < (data?.length ?? 0)) {
        const hiddenValuesArray: boolean[] = [];
        data?.map((post) => (hiddenValuesArray.push(post.isHidden)))
        setDisplay(hiddenValuesArray)
    }

    // Saving the original array as a backup, we'll use this to restore the UI state in case anything goes wrong(revert the update to ui)

    const originalHiddenValuesArray = display;

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

    // This is a callback changing the state uppon error of the mutation to hidden posts value, changing the state will change the button value

    const onHideError = () => {
        setDisplay(originalHiddenValuesArray)
    }

    const { mutate: mutatePost, isError: isMutatePostError } = useEditPostPartially(onVisibilitySuccess, onHideError)

    // Delete a post by id

    const deletePost = (postId: string) => {
        mutate(postId);
    }

    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8}>

            <Heading mb={"24"}> Posts </Heading>

            <SimpleGrid columns={2} spacing="5">

                {data?.map((post, index) => {

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

                                // We change the state array at the location of the button being clicked, the rest stays the same

                                const emptyHiddenValuesArray = []; 

                                for(let i = 0; i < display.length; i++) {
                                    if(i == index) emptyHiddenValuesArray.push(!display[i])
                                    else if (i != index) emptyHiddenValuesArray.push(display[i])
                                }

                                // We then do the optimistic update by changing the button text, showing the result before actually mutating the data.
                                // The mutation hook will take care of reverting the update to the UI if anything goes wrong

                                setDisplay(emptyHiddenValuesArray)

                                mutatePost({postId: post.postId, isHidden: !post.isHidden, isFirstPage: post.isFirstPage});
                                
                            }}>

                                { display[index] == true ? <Text> Show </Text> : <Text> Hide </Text>}

                            </Button>




                            <Button variant='outline' colorScheme='green' onClick={() => {
                                mutatePost({postId: post.postId, isHidden: post.isHidden, isFirstPage: !post.isFirstPage})
                            }}>
                                { post.isFirstPage == true ? <Text> Normalize </Text> : <Text> Highlight </Text> }
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