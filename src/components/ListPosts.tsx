import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, SimpleGrid, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useDeletePost from "../hooks/useDeletePost";
import useEditPostPartially from "../hooks/useEditPostPartially";
import useGetPosts from "../hooks/useGetPosts";
import { baseImgUrl } from "../types/main";


const ListPosts = () => {

    const { isLoading, isError, data } = useGetPosts();
    // const baseImgUrl = "api.arielcarvalho.io/";
    const toast = useToast();

    // Variables for button optimistic updates

    const [display, setDisplay] = useState<boolean[]>([]);
    const [firstPage, setFirstPage] = useState<boolean[]>([]);

    /* 
       We get the data from the database and fill up a state array with all the booleans saying whether a post
       is hidden or not. We use this state to change the button values immediately (optimistic update) to give the
       user a better experience.

       The buttons will check the state variables instead of the data itself coming from the database. That way we
       can update things immediately  
    */

    if (display.length < (data?.length ?? 0)) {
        const isHiddenValuesArray: boolean[] = [];

        data?.map((post) => (isHiddenValuesArray.push(post.isHidden)));

        setDisplay(isHiddenValuesArray);
    }


    if (display.length < (data?.length ?? 0)) {
        const isFirstPageValuesArray: boolean[] = [];

        data?.map((post) => isFirstPageValuesArray.push(post.isFirstPage));

        setFirstPage(isFirstPageValuesArray);
    }

    // Saving the original array as a backup, we'll use this to restore the UI state in case anything goes wrong(revert the update to ui)

    const originalIsHiddenValuesArray = display;
    const originalIsFirstPageArray = firstPage;

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

    const onEditSuccess = () => {
        return toast({
          title: 'Visibility edited successfuly.',
          description: "Post visibility has been toggled",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
    }

    const { isLoading: isDeleteLoading, isError: isDeleteError, mutate } = useDeletePost(onDeletionSuccess);

    // This is a callback changing the state uppon error of the mutation to hidde posts value, changing the state will change the button value

    const onEditError = () => {

        // Set all button values to their original state

        setDisplay(originalIsHiddenValuesArray);
        setFirstPage(originalIsFirstPageArray);
    }

    const { mutate: mutatePost, isError: isMutatePostError } = useEditPostPartially(onEditSuccess, onEditError)

    // Delete a post by id

    const deletePost = (postId: string) => {
        mutate(postId);
    }

    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8}>

            <Heading mb={"24"}> Posts </Heading>

            { isLoading && <Spinner /> }

            { isError && <Text color="red"> Something went wrong! </Text> }

            <SimpleGrid columns={2} spacing="5">

                {data?.map((post, index) => {

                return <Card minW='md' key={post.postId}>
                    <CardBody>
                        <Image
                        src={"https://" + baseImgUrl + post.imageUrl}
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

                        <Text fontWeight={"bold"}> Extra links: </Text>

                        <SimpleGrid columns={3}>
                            {post?.extraLinks.map(link => <a key={link.linkId} href={link.link} target="_blank"> {link.linkText} </a>)}
                        </SimpleGrid>

                        </Stack>
                    </CardBody>

                    <Divider />

                    <CardFooter>

                        <ButtonGroup spacing='2'>
                            <Button as={Link} to={"create/" + post.postId} variant='solid' colorScheme='blue'>
                                Edit post 
                            </Button>

                            <Button variant='solid' colorScheme='red' onClick={() => deletePost(post.postId)}>
                                Delete
                            </Button>

                            

                            <Button variant='outline' colorScheme='yellow' onClick={() => {

                                // We change the state array at the location of the button being clicked, the rest stays the same

                                const emptyHiddenValuesArray = []; 

                                for(let i = 0; i < display.length; i++) {
                                    if(i == index) emptyHiddenValuesArray.push(!display[i]);
                                    else if (i != index) emptyHiddenValuesArray.push(display[i]);
                                }

                                /* We then do the optimistic update by changing the button text, showing the result before actually mutating the data.
                                 The mutation hook will take care of reverting the update to the UI if anything goes wrong */

                                setDisplay(emptyHiddenValuesArray);

                                mutatePost({postId: post.postId, isHidden: !post.isHidden, isFirstPage: post.isFirstPage});
                                
                            }}>

                                { display[index] == true ? <Text> Show </Text> : <Text> Hide </Text>}

                            </Button>



                            <Button variant='outline' colorScheme='green' onClick={() => {

                                const emptyIsFirstPageArray = [];

                                for(let i = 0; i < firstPage.length; i++) {
                                    if(i == index) emptyIsFirstPageArray.push(!firstPage[i]);
                                    else if(i != index) emptyIsFirstPageArray.push(firstPage[i])
                                }

                                setFirstPage(emptyIsFirstPageArray);

                                mutatePost({postId: post.postId, isHidden: post.isHidden, isFirstPage: !post.isFirstPage})
                            }}>
                                
                                { firstPage[index] == true ? <Text> Normalize </Text> : <Text> Highlight </Text> }

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