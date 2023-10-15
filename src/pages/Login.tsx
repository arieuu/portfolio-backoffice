import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const Login = () => {

    const { mutate, data, isLoading, error} = useAuth();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    let username = "";
    let password = "";


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(usernameRef.current && passwordRef.current) {
            username = usernameRef.current.value;
            password = passwordRef.current.value;

            mutate({"username": username, "password": password});
        }


    }

    return(

        <Flex direction="column" height="100vh" alignItems="center" justifyContent="center">
                <Text fontSize="5xl" mb="10"> Login </Text> 

                <form onSubmit={ handleSubmit }>
                    <Stack>

                        <Input ref={ usernameRef } autoFocus variant="filled" placeholder="Username" size="lg" width="400px" height="60px" focusBorderColor="black"/>
                        <Input ref={ passwordRef } variant="outline" type="password" placeholder="Password" size="lg" width="400px" height="60px" focusBorderColor="black"/>

                        <Button size="lg" type="submit" isDisabled={isLoading}> Login </Button>

                        { error && <Alert status='error'>
                        <AlertIcon />

                        <AlertTitle> {error.message} </AlertTitle>

                        </Alert>
                        }
                    </Stack>
                </form>

        </Flex>
    )

}

export default Login;