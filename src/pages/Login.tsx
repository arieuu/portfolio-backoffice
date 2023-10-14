import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";


const Login = () => {

    return(
        <Flex direction="column" height="100vh" alignItems="center" justifyContent="center">
                <Text fontSize="5xl" mb="10"> Login </Text> 

                <form>
                    <Stack>
                        <Input variant="filled" placeholder="Username" size="lg" width="400px" height="60px" focusBorderColor="black"/>
                        <Input variant="outline" type="password" placeholder="Password" size="lg" width="400px" height="60px" focusBorderColor="black"/>
                        <Button size="lg" type="submit"> Login </Button>
                    </Stack>
                </form>

        </Flex>
    )

}

export default Login;