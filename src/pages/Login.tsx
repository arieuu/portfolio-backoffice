import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";


const Login = () => {

    const [username, setUsername] = useState("")
    const [password , setPassword] = useState("")

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(usernameRef.current) {
            setUsername(usernameRef.current.value);
        }

        if(passwordRef.current) {
            setPassword(passwordRef.current.value);
        }

    }

    return(
        <Flex direction="column" height="100vh" alignItems="center" justifyContent="center">
                <Text fontSize="5xl" mb="10"> Login </Text> 

                <form onSubmit={ handleSubmit }>
                    <Stack>

                        <Input ref={ usernameRef } variant="filled" placeholder="Username" size="lg" width="400px" height="60px" focusBorderColor="black"/>
                        <Input ref={ passwordRef } variant="outline" type="password" placeholder="Password" size="lg" width="400px" height="60px" focusBorderColor="black"/>

                        <Button size="lg" type="submit"> Login </Button>

                    </Stack>
                </form>

        </Flex>
    )

}

export default Login;