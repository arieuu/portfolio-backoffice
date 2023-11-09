import { Alert, AlertIcon, AlertTitle, Button, Flex, Image, FormControl, FormLabel, Heading, Input, InputGroup, Select, Spinner, Text, Textarea, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import useCreatePost from "../hooks/useCreatePost";
import useEditPost from "../hooks/useEditPost";
import useGetOnePost from "../hooks/useGetOnePost";
import { IExtraLink, IPost, baseImgUrl } from "../types/main";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg", "svg"];

const schema = z.object({
    title: z.string().min(4, {message: "Title too short"}),
    year: z.string().min(4, {message: "Year info incorrect"}),
    description: z.string().min(8, {message: "Description too short"}),
    more: z.string().min(0),
    link: z.string().min(4, {message: "Link too short"}),
    tools: z.string().min(2, {message: "Tools too short"}),
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

    const { postIdParam } = useParams();


    const [quantityExtraLinks, setQuantityExtraLinks] = useState(0)
    const [extraLinks, setExtraLinks] = useState<IExtraLink[]>([])

    // EDITING MODE 

    let editing = false
    const checkParam = postIdParam ? postIdParam : "none"
    const { data: paramData, isLoading: isParamLoading } = useGetOnePost(checkParam);

    const [ displayImg, setDisplayImg ] = useState(false);

    // The placeholder will show how many extra links are available when editing

    const [extraLinksPlaceholder, setExtraLinksPlaceholder] = useState("");

    const onSuccess = () => {
        return toast({
          title: 'Post successfuly saved.',
          description: "The post has been persisted to the database",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
    }


    // Hook for creating post

    const { isLoading: isLoadingCreatePost, isError: isErrorCreatePost, isSuccess: isPostCreatedSuccess, data: dataCreatedPost, mutate } = useCreatePost(onSuccess);

    // Hook for editing post

    const { data: editedPostData, isLoading: isLoadingEditPost, isError: isEditPostError, mutate: mutateEditPost} = useEditPost(onSuccess);

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


        /** To delete extra links we just need to delete either the text
         * or the link. Then it will be excluded from the final object
         */

        const finalExtraLinksArray: IExtraLink[] = [];

        extraLinks.map((extraLink) => {
            if(extraLink.linkText.length > 0) finalExtraLinksArray.push(extraLink)
        })


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
        
        // Here we decide what hook to use (if it's an edit or a creation)

        if(paramData?.title) {
            postData.postId = paramData.postId; 
            mutateEditPost(postData);

        // If there's no post already pre-loaded we are creating a new one

        } else if(!paramData?.title) {
            mutate(postData);
        }

        // Clean up inputs after a submit. This needs to be checked so it happens only on successful submits

        setValue("title", "");
        setValue("year", "");
        setValue("description", "");
        setValue("more", "");
        setValue("link", "");
        setValue("tools", "");
        setValue("projectImage", "");
        setValue("extraLinkQuantity", "0")
        setQuantityExtraLinks(0)

    }


    useEffect(() => {

        // If there's a paramete in the url then we are editing data, so we set all the inputs with the needed data

        if(paramData?.title) {
            setValue("title", paramData?.title)
            setValue("year", paramData?.year)
            setValue("description", paramData?.description)
            setValue("more", paramData.more);
            setValue("link", paramData.link);
            setValue("tools", paramData.tools);
            setValue("projectImage", paramData.projectImage);
            setExtraLinks(paramData.extraLinks) 
            setValue("isFirstPage", paramData.isFirstPage.toString());
            setValue("isHidden", paramData.isHidden.toString())

            // This field is optional

            if(paramData.more) setValue("more", paramData?.more)


        } else {
            setValue("title", "")
            setValue("year", "")
            setValue("description", "")
            setValue("more", "");
            setValue("link", "");
            setValue("tools", "");
            setValue("projectImage", "");
            setValue("isFirstPage", "true");
            setValue("isHidden", "false");

        } 

        if(paramData?.title) editing = true


        // Editing test

        if(editing) {

            if(paramData?.extraLinks) {
                setExtraLinksPlaceholder(paramData.extraLinks.length.toString())
            }

        } else {
            setQuantityExtraLinks(0)
            setValue("extraLinkQuantity", "")
            setExtraLinksPlaceholder("How many extra links")
        }

    }, [paramData?.title, paramData?.extraLinks, paramData?.isHidden, paramData?.isFirstPage])

    return(
        <Flex flexDirection="column" alignItems="center" justifyContent="center" p={8} px={32}>
            { paramData?.title ? <Heading mb={"24"}> Edit post </Heading> : <Heading mb={"24"}> Create post </Heading> }


            <Button colorScheme="blue" onClick={ () => setDisplayImg(!displayImg)} mb={10}> Display img </Button>

            { displayImg && paramData?.title && <Image paddingBottom={"10"} src={ "https://" + baseImgUrl + paramData?.imageUrl }/> }

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
                <Select id="isFirstPage" defaultValue={"true"} {...register("isFirstPage")} border="1px black solid" mb={7}>
                    <option value={"true"}> Yes </option>
                    <option value={"false"}> No </option>
                </Select>
                { (errors.isFirstPage) && <Alert mb={7} status='error'> <AlertIcon /> <AlertTitle> {errors.isFirstPage?.message?.toString()}</AlertTitle> </Alert> }

                <FormLabel> Hide post </FormLabel>
                <Select id="isHidden" defaultValue={"false"} {...register("isHidden")} border="1px black solid" mb={7}>
                    <option value={"true"}> Yes </option>
                    <option value={"false"}> No </option>
                </Select>



                <FormLabel> Extra links { paramData && paramData.extraLinks && paramData.extraLinks.length > 0 && "(delete link text to remove extralink)" } </FormLabel>
                <Input id="extraLinkQuantity" {...register("extraLinkQuantity")} type="number" placeholder={extraLinksPlaceholder} border="1px black solid" mb={7} onChange={(num) => {
                    
                    // Only if editing

                    if(editing && parseInt(num.target.value) > quantityExtraLinks) setQuantityExtraLinks(parseInt(num.target.value))

                    // If normal

                    setQuantityExtraLinks(parseInt(num.target.value))
                }}/>

                
                
                {Array.from({length: quantityExtraLinks}).map((number, index) => {

                    // Turning the quantity of extralinks inserted into inputs. We make it into an array and go through the item doing what need to be done

                    const extraLink = {
                        link: "",
                        linkText: ""
                    }

                    if(extraLinks.length < quantityExtraLinks) setExtraLinks([...extraLinks, extraLink])

                    return <InputGroup key={index}> 
                                
                                <Input defaultValue={extraLinks[index]?.linkText} onChange={((res) => setExtralinkState(index, res.target.value, undefined))} type="text" placeholder="Link text" border="1px black solid" mb={7} mr={3}/>

                                <Input id="extraLinkLink" defaultValue={extraLinks[index]?.link} onChange={(res) => setExtralinkState(index, undefined,res.target.value)} type="text" placeholder="Link" border="1px black solid" mb={7}/>

                            </InputGroup>
                })}


                { isErrorCreatePost && <Text color="red"> Something went wrong! </Text> }
                { isEditPostError && <Text color="red"> Something went wrong! </Text> }

                <Button type="submit" colorScheme="linkedin"> {isLoadingCreatePost && <Spinner />} {isLoadingEditPost && <Spinner />} { paramData?.title ? <Text> Edit post </Text>: <Text> Create Post </Text> } </Button>

            </FormControl>
            
        </Flex>
    )

}

export default CreatePost;