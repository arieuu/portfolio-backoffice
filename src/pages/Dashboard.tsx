import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    
    return (
        <Flex maxWidth="80%" marginX="auto" height="100vh" alignItems="start" paddingTop="14" gap={10}>
            
            <Box  width="20%" paddingBottom=""  minHeight="90%" alignItems="center" display="flex" flexDirection="column" backgroundColor="gray.100">

                <Heading mb="8" mt="8"> Menu </Heading>

                <Stack width="80%">
                    <Button as={NavLink} to=" " mb="8" _activeLink={{background: "#00a0dc", color: "white"}} border="1px solid #00a0dc" color="#00a0dc"> Home </Button>

                <Heading alignSelf="center" mb="8" fontSize={"2xl"}> Loose data </Heading>

                    <Button as={NavLink} to="data" end _activeLink={{background: "#00a0dc", color: "white"}} border="1px solid #00a0dc" color="#00a0dc"> List data </Button>

                    <Button as={NavLink} to="data/create"  _activeLink={{background: "#00a0dc", color: "white"}} border="1px solid #00a0dc" color="#00a0dc"> Create data </Button>

                </Stack>

                <Heading mb="8" mt="8" fontSize={"2xl"}> Posts </Heading>
                <Stack width="80%">
                    <Button as={NavLink} to="posts" end _activeLink={{background: "#00a0dc", color: "white"}} border="1px solid #00a0dc" color="#00a0dc"> List posts </Button>
                    <Button as={NavLink} to="posts/create" _activeLink={{background: "#00a0dc", color: "white"}} border="1px solid #00a0dc" color="#00a0dc"> Create post </Button>
                </Stack>
                


                <Heading mb="8" mt="8" fontSize={"2xl"}> Extras </Heading>
                <Stack width="80%">
                    <Button as={NavLink} to="/" colorScheme="red" variant="outline" onClick={() => localStorage.setItem("loginToken", "")}> Logout </Button>
                </Stack>
            </Box>



            <Box width="100%" minHeight={"90%"} backgroundColor={"gray.100"}>
                <Outlet />
            </Box>


        </Flex>
    )

}

export default Dashboard;