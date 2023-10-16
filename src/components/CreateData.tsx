import { Alert, AlertIcon, AlertTitle, Button, Flex, FormControl, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { string, z } from "zod";

const schema = z.object({
    type: z.string().min(4, {message: "Type too short"}),
    title: z.string().min(4, {message: "Title too short"}),
    content: z.string().min(8, {message: "Content too short"}),
    extra: z.string().min(8, {message: "Extra content too short"}),
});

// Getting object shape from our created zod schema object
type SchemaShape = z.infer<typeof schema>;

const CreateData = () => {

    const { register, handleSubmit, formState: { errors }} = useForm<SchemaShape>({ resolver: zodResolver(schema)});

    const onSubmit: SubmitHandler<SchemaShape> = (data) => {

        console.log(data.title);
        console.log(data.content);
    }

    return(
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8} px={32}>
            <Heading mb={"24"}> Create data </Heading>

            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>

                <FormLabel>Data type</FormLabel>
                <Input id="type" {...register("type")}  type='text' placeholder="Insert data type" border="1px black solid" mb={7} autoFocus/>

                { (errors.type) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.type?.message}</AlertTitle> </Alert> }


                <FormLabel>Title</FormLabel>
                <Input id="title" {...register("title")} type='text' placeholder="Insert data title" border="1px black solid" mb={7}/>

                { (errors.title) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.title?.message}</AlertTitle> </Alert> }

                <FormLabel>Content</FormLabel>
                <Textarea id="content" {...register("content")} placeholder="Insert data content" border="1px black solid" mb={7}/>

                { (errors.content) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.content?.message}</AlertTitle> </Alert> }

                <FormLabel>Extra content</FormLabel>
                <Textarea id="extra" {...register("extra")} placeholder="Insert extra data content" border="1px black solid" mb={7}/>
                
                { (errors.extra) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.extra?.message}</AlertTitle> </Alert> }

                <Button type="submit" colorScheme="linkedin"> Create data </Button>
            </FormControl>
            
        </Flex>
    )

}

export default CreateData;