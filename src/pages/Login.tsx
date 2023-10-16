import { Alert, AlertIcon, AlertTitle, Button, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const schema = z.object({
    username: z.string().min(4, {message: "Username too short"}),
    password: z.string().min(4, {message: "Password too short"})
});

// Getting object shape from our created zod schema object
type SchemaShape = z.infer<typeof schema>;

const Login = () => {

    const { register, handleSubmit, formState: { errors }} = useForm<SchemaShape>({ resolver: zodResolver(schema)});
    const { mutate, isLoading, error} = useAuth();

    const onSubmit: SubmitHandler<SchemaShape> = (data) => {

        /* We don't even need to prevent form default behaviour.
           We Also don't need to check if the data has been received because
           the form won't submit until everything has been validated
        */

        const username = data.username;
        const password = data.password;

        mutate({"username": username, "password": password});

    }


    return(

        <Flex direction="column" height="100vh" alignItems="center" justifyContent="center">
                <Heading fontSize="6xl" mb="10"> Login </Heading>
                <form onSubmit={ handleSubmit(onSubmit)}>

                    <Stack>

                        <Input id="username" {...register("username")} autoFocus variant="filled" placeholder="Username" size="lg" width="400px" height="60px" focusBorderColor="black"/>

                            { (errors.username ) && <Alert status='error'>
                                <AlertIcon />
                                <AlertTitle> {errors.username?.message}</AlertTitle>
                                </Alert>
                            }

                        <Input id="password" {...register("password")} variant="outline" type="password" placeholder="Password" size="lg" width="400px" height="60px" focusBorderColor="black"/>

                            { (errors.password) && <Alert status='error'>
                                <AlertIcon />
                                <AlertTitle> {errors.password?.message}</AlertTitle>
                                </Alert>
                            }

                        <Button size="lg" type="submit" isDisabled={isLoading}> Login </Button>

                        { (error) && <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle> {error?.message} </AlertTitle>
                            </Alert>
                        }

                    </Stack>

                </form>

        </Flex>
    )

}

export default Login;