import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGetLooseData from "../hooks/useGetLooseData";


const ListData = () => {

    const {isLoading, data}= useGetLooseData();


    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8}>
            <Heading mb={"24"}> Loose data </Heading>


            <SimpleGrid columns={3} spacing="5">

            {isLoading && <Spinner /> }

            {data?.map((looseData) => {
                return (<Card key={looseData.dataId}>
                            <CardHeader>
                                <Heading size='xl'> {looseData.title} </Heading>
                            </CardHeader>

                            <CardBody>
                                <Text>
                                    {looseData.content}
                                    <br /> <br />
                                    {looseData.extraContent}
                                </Text>
                            </CardBody>

                            <CardFooter>
                                <Button as={Link} to={"data/create/" + looseData.dataId}> Edit item </Button>
                            </CardFooter>
                        </Card>)})}

            </SimpleGrid>
        </Flex>
    );
}

export default ListData;