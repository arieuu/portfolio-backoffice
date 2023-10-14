import { Button, Flex, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";


const Login = () => {

    const { mutate, data, isLoading, error} = useAuth();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(usernameRef.current && passwordRef.current) {
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;

            mutate({"username": username, "password": password});
        }

    }

    return(
        <Flex direction="column" height="100vh" alignItems="center" justifyContent="center">
                <Text fontSize="5xl" mb="10"> Login </Text> 
                {data}

                <form onSubmit={ handleSubmit }>
                    <Stack>

                        
                        <Input ref={ usernameRef } variant="filled" placeholder="Username" size="lg" width="400px" height="60px" focusBorderColor="black"/>
                        <Input ref={ passwordRef } variant="outline" type="password" placeholder="Password" size="lg" width="400px" height="60px" focusBorderColor="black"/>

                        <Button size="lg" type="submit"> { isLoading && <Spinner /> } {!isLoading && <span> Login </span>} </Button>

                    </Stack>
                </form>

        </Flex>
    )

}

export default Login;