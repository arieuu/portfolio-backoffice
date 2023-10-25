import { Alert, AlertIcon, AlertTitle, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, Select, Spinner, Text, Textarea, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import useGetOneLooseData from "../hooks/useGetOneLooseData";
import useCreatePost from "../hooks/useCreatePost";
import { IExtraLink, IPost } from "../types/main";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
    title: z.string().min(4, {message: "Title too short"}),
    year: z.string().min(4, {message: "Year info incorrect"}),
    description: z.string().min(8, {message: "Description too short"}),
    more: z.string().min(0),
    link: z.string().min(4, {message: "Link too short"}),
    tools: z.string().min(8, {message: "Tools too short"}),
    isFirstPage: z.string(),
    isHidden: z.string(),
    extraLinkText: z.string().optional().nullable(),
    extraLinkLink: z.string().optional().nullable(),
    extraLinkQuantity: z.string().optional().nullable(),

    // Validating image (file input) with zod

    projectImage: z
    .any()
    .refine((files) => files?.length === 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

// Getting object shape from our created zod schema object

type SchemaShape = z.infer<typeof schema>;


/**
 * This component serves both to create data and to edit, it morphes depending if there's a parameter in the url.
 * 
 * If there is a url param a specific hook is used to get a single loose data by that type, if not we just create a new one
 */

const CreatePost = () => {

    const { register, handleSubmit, formState: { errors }, setValue} = useForm<SchemaShape>({ resolver: zodResolver(schema)});
    const toast = useToast();

    const { dataTypeParam } = useParams();

    const { data: paramData, isLoading: isParamLoading } = useGetOneLooseData(dataTypeParam);

    const [quantityExtraLinks, setQuantityExtraLinks] = useState(0)
    const [extraLinks, setExtraLinks] = useState<IExtraLink[]>([])

    
    // EDITING MODE 

    let editing = false

    const onSuccess = () => {
        return toast({
          title: 'Post successfuly created.',
          description: "The post has been persisted to the database",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
    }

    const { isLoading: isLoadingCreatePost, isError: isErrorCreatePost, data: dataCreatedPost, mutate } = useCreatePost(onSuccess);

    const setExtralinkState = (index: number, linkText?: string, link?: string) => {
        const newExtraLinks: IExtraLink[] = [];

        extraLinks.map((extraLink, linkPosition) => {
           if(linkPosition == index) {

            if(linkText) {
                extraLink.linkText = linkText;
                newExtraLinks.push(extraLink)
            }

            else if(link) {
                extraLink.link = link
                newExtraLinks.push(extraLink)
            }

           } else {
            newExtraLinks.push(extraLink)
           }

        });

        setExtraLinks(newExtraLinks);
    }


    const onSubmit: SubmitHandler<SchemaShape> = (data) => {

        const finalExtraLinksArray: IExtraLink[] = [];

        extraLinks.map((extraLink) => {
            if(extraLink.linkText != "") finalExtraLinksArray.push(extraLink)
        });
        
        const postData: IPost = {
            postId: "",
            title: data.title,
            year: data.year,
            description: data.description,
            more: data.more,
            link: data.link,
            tools: data.tools,
            isFirstPage: data.isFirstPage == "true", // Converting to boolean
            isHidden: data.isHidden == "true",
            projectImage: data.projectImage[0],      // This propriety needs to be same name as multer's upload.single to work
            extraLinks: finalExtraLinksArray,
        }

        console.log(postData);

        mutate(postData);
        // Clean state after successful submit

        // setValue("extraLinkText0", "text")
        setExtraLinks([])

        // We do the same for the data that was gotten from the parameter (fetched with the other custom hook)

        if (paramData) paramData.title = ""
        if (paramData) paramData.type = ""
        if (paramData) paramData.content = ""
        if (paramData?.extraContent) paramData.extraContent = ""

    }

    useEffect(() => {

        // If there's a paramete in the url then we are editing data, so we set all the inputs with the needed data

        if(paramData) {
            // setValue("title", paramData?.title)
            // setValue("description", paramData?.description)

            // This field is optional

            if(paramData.extraContent) setValue("more", paramData?.extraContent)
        }

        // Editing test

        if(editing) {
            // setQuantityExtraLinks(2)
            setValue("extraLinkQuantity", "2")
            setExtraLinks([{linkText: "testtext", link: "link.com"}, {linkText: "fodas", link: "fdfd"}])

        }
    })

    return(
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8} px={32}>
            { dataTypeParam ? <Heading mb={"24"}> Edit data </Heading> : <Heading mb={"24"}> Create post</Heading> }

            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>

                <FormLabel> Post title </FormLabel>
                <Input id="title" {...register("title")} type='text' placeholder="Insert post title" border="1px black solid" mb={7} autoFocus/>

                { (errors.title) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.title?.message}</AlertTitle> </Alert> }


                <FormLabel> Year </FormLabel>
                <Input id="year" {...register("year")} type='text' placeholder="Insert a year for post" border="1px black solid" mb={7}/>

                { (errors.year) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.year?.message}</AlertTitle> </Alert> }

                <FormLabel> Description </FormLabel>
                <Textarea id="description" {...register("description")} placeholder="Insert post description" border="1px black solid" mb={7}/>
                { (errors.description) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.description?.message}</AlertTitle> </Alert> }

                <FormLabel> More </FormLabel>
                <Textarea id="more" {...register("more")} placeholder="Insert more description if any" border="1px black solid" mb={7}/>
                { (errors.more) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.more?.message}</AlertTitle> </Alert> }

                <FormLabel> Link </FormLabel>
                <Input id="link" {...register("link")} type="text" placeholder="Insert project link" border="1px black solid" mb={7}/>
                { (errors.link) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.link?.message}</AlertTitle> </Alert> }

                <FormLabel> Tools </FormLabel>
                <Input id="tools" {...register("tools")} type="text" placeholder="List project tools" border="1px black solid" mb={7}/>
                { (errors.tools) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.tools?.message}</AlertTitle> </Alert> }

                <FormLabel> Post thumbnail </FormLabel>
                <Input id="projectImage" {...register("projectImage")} type="file" placeholder="Post thumbnail" border="1px black solid" mb={7}/>
                { (errors.projectImage) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.projectImage?.message?.toString()}</AlertTitle> </Alert> }

                <FormLabel> Home page </FormLabel>
                <Select id="isFirstPage" {...register("isFirstPage")} border="1px black solid" mb={7}>
                    <option value='true'> Yes </option>
                    <option value='false'> No </option>
                </Select>
                { (errors.isFirstPage) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.isFirstPage?.message?.toString()}</AlertTitle> </Alert> }

                <FormLabel> Hide post </FormLabel>
                <Select id="isHidden" {...register("isHidden")} border="1px black solid" mb={7}>
                    <option value="true"> Yes </option>
                    <option value='false'> No </option>
                </Select>




                <FormLabel> Extra links </FormLabel>
                <Input id="extraLinkQuantity" {...register("extraLinkQuantity")} type="number" placeholder="How many extra links" border="1px black solid" mb={7} onChange={(num) => {
                    if(editing) editing = false
                    
                    // Only if editing
                    if(editing && parseInt(num.target.value) > 1) setQuantityExtraLinks(parseInt(num.target.value))

                    // Normal
                    setQuantityExtraLinks(parseInt(num.target.value))
                }}/>
                
                {Array.from({length: quantityExtraLinks}).map((number, index) => {
                    const extraLink = {
                        link: "",
                        linkText: ""
                    }

                    if(extraLinks.length < quantityExtraLinks) setExtraLinks([...extraLinks, extraLink])
                    return <InputGroup key={index}> 
                                { /*<Input id={"extraLinkText" + index} defaultValue={extraLinks[index]?.linkText} onChange={((res) => setExtralinkState(index, res.target.value, undefined))} type="text" placeholder="Link text" border="1px black solid" mb={7} mr={3}/> */}
                                <Input required id={"extraLinkText" + index} onChange={((res) => setExtralinkState(index, res.target.value, undefined))} type="text" placeholder="Link text" border="1px black solid" mb={7} mr={3}/>
                                { (errors.extraLinkText) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.extraLinkText?.message?.toString()}</AlertTitle> </Alert> }


                                <Input required id="extraLinkLink"  onChange={(res) => setExtralinkState(index, undefined,res.target.value)} type="text" placeholder="Link" border="1px black solid" mb={7}/>
                                { (errors.extraLinkLink) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.extraLinkLink?.message?.toString()}</AlertTitle> </Alert> }
                            </InputGroup>
                })}


                <Button type="submit" colorScheme="linkedin"> Create post </Button>

            </FormControl>
            
        </Flex>
    )

}

export default CreatePost;