import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const ListData = () => {
    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8}>
            <Heading mb={"24"}> Loose data </Heading>

            <SimpleGrid columns={3} spacing={5}>
                <Card>
                    <CardHeader>
                        <Heading size='xl'> Where you are? </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
                            voluptatum consequuntur vel dolorum provident ad fugit veritatis aut voluptates eum!
                        </Text>
                    </CardBody>
                    <CardFooter>
                        <Button as={Link}> Edit item </Button>
                    </CardFooter>
                </Card>



                <Card>
                    <CardHeader>
                        <Heading size='xl'> Page details </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
                            voluptatum consequuntur vel dolorum provident ad fugit veritatis aut voluptates eum!
                        </Text>
                    </CardBody>
                    <CardFooter>
                        <Button as={Link}> Edit item </Button>
                    </CardFooter>
                </Card>



                <Card>
                    <CardHeader>
                        <Heading size='xl'> About me </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
                            voluptatum consequuntur vel dolorum provident ad fugit veritatis aut voluptates eum!
                        </Text>
                    </CardBody>
                    <CardFooter>
                        <Button as={Link}> Edit item </Button>
                    </CardFooter>
                </Card>


                <Card>
                    <CardHeader>
                        <Heading size='xl'> More about me </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
                            voluptatum consequuntur vel dolorum provident ad fugit veritatis aut voluptates eum!
                        </Text>
                    </CardBody>
                    <CardFooter>
                        <Button as={Link}> Edit item </Button>
                    </CardFooter>
                </Card>


                <Card>
                    <CardHeader>
                        <Heading size='xl'> Footer </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
                            voluptatum consequuntur vel dolorum provident ad fugit veritatis aut voluptates eum!
                        </Text>
                    </CardBody>
                    <CardFooter>
                        <Button as={Link}> Edit item </Button>
                    </CardFooter>
                </Card>
            </SimpleGrid>
        </Flex>
    );
}

export default ListData;