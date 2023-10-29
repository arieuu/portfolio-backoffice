import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGetLooseData from "../hooks/useGetLooseData";
import useGetPosts from "../hooks/useGetPosts";


const DashboardHome = () => {

    const { isLoading: isDataLoading, data: looseData, isError: isLooseDataError } = useGetLooseData();
    const { isLoading: isPostsLoading, data: postsData, isError: isPostsError } = useGetPosts();

    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8}>
            <Heading mb={"24"}> Dashboard </Heading>

            <Heading mb={8} alignSelf="start"> Your portfolio </Heading>
            <SimpleGrid columns={3} spacing={5}>
                <Card>
                    <CardHeader>
                        <Heading size='xl'>Posts</Heading>
                    </CardHeader>

                    <CardBody>

                        { isPostsLoading && <Spinner /> }
                        { isPostsError && <Text color="red"> Something went wrong! </Text> }

                        <Text> There are <strong> { postsData?.length } </strong> posts currently listed in your portfolio. </Text>

                    </CardBody>

                    <CardFooter>
                        <Button as={Link} to="posts"> View items </Button>
                    </CardFooter>
                </Card>


                <Card >
                    <CardHeader>
                        <Heading size='xl'> Loose data </Heading>
                    </CardHeader>

                    <CardBody>

                        { isDataLoading && <Spinner /> }
                        { isLooseDataError && <Text color="red"> Something went wrong! </Text> }

                        <Text> There are <strong> {looseData?.length} </strong> editable pieces of loose data currently listed in your portfolio. </Text>
                    </CardBody>

                    <CardFooter>
                        <Button as={Link} to="data"> View items </Button>
                    </CardFooter>
                </Card>
                

            </SimpleGrid>
        </Flex>
    );
}

export default DashboardHome;