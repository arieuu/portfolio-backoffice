import { Alert, AlertIcon, AlertTitle, Button, Flex, FormControl, FormLabel, Heading, Input, Spinner, Text, Textarea, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import useCreateLooseData from "../hooks/useCreateLooseData";
import useGetOneLooseData from "../hooks/useGetOneLooseData";

const schema = z.object({
    type: z.string().min(4, {message: "Type too short"}),
    title: z.string().min(4, {message: "Title too short"}),
    content: z.string().min(8, {message: "Content too short"}),
    extra: z.string().min(0, {message: "Extra content too short"}),
});

// Getting object shape from our created zod schema object

type SchemaShape = z.infer<typeof schema>;


/**
 * This component serves both to create data and to edit, it morphes depending if there's a parameter in the url.
 * 
 * If there is a url param a specific hook is used to get a single loose data by that type, if not we just create a new one
 */

const CreateData = () => {

    const { register, handleSubmit, formState: { errors }, setValue} = useForm<SchemaShape>({ resolver: zodResolver(schema)});
    const toast = useToast();

    const { dataTypeParam } = useParams();

    const { data: paramData, isLoading: isParamLoading } = useGetOneLooseData(dataTypeParam);
    


    const onSuccess = () => {
        return toast({
          title: 'Data persisted.',
          description: "The data has been successfuly persisted to the database",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
    }

    const { mutate, isError: isCreateError, isLoading } = useCreateLooseData(onSuccess)

    const onSubmit: SubmitHandler<SchemaShape> = (data) => {
        const looseData = {
            type: data.type,
            title: data.title,
            content: data.content,
            extraContent: data.extra
        }

        mutate(looseData);

        // After a successful submission we clean up all the inputs to avoid re-sending of the data and user experience

        setValue("type", "")
        setValue("title", "")
        setValue("content", "")
        setValue("extra", "")

        // We do the same for the data that was gotten from the parameter (fetched with the other custom hook)

        /*
        if (paramData) {
            paramData.title = "";
            paramData.type = "";
            paramData.content = "";
            paramData.extraContent = "";
        }
        */

    }

    useEffect(() => {

        // If there's a passed parameter returns data then we are editing data, so we set all the inputs with the needed data

        if(paramData?.title) {
            setValue("type", paramData?.type)
            setValue("title", paramData?.title)
            setValue("content", paramData?.content)

            // This field is optional

            if(paramData.extraContent) setValue("extra", paramData?.extraContent)

        } else {
            setValue("type", "")
            setValue("title", "")
            setValue("content", "")
        }
        
    }, [paramData?.title])


    return(
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8} px={32}>
            { paramData?.title ? <Heading mb={"24"}> Edit data </Heading> : <Heading mb={"24"}> Create data </Heading> }

            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>

                <FormLabel>Data type</FormLabel>
                <Input id="type" {...register("type")} type='text' placeholder="Insert data type" border="1px black solid" mb={7} autoFocus/>

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

                { isCreateError && <Text color="red"> Something went wrong! </Text> }
                <Button type="submit" colorScheme="linkedin"> {isLoading && <Spinner /> } { paramData?.title ? <Text> Edit data </Text> : <Text> Create data </Text>} </Button>

            </FormControl>
            
        </Flex>
    )

}

export default CreateData;