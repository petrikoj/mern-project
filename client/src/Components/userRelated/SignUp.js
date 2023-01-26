import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import {
  Avatar,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiUploadCloud2Line } from "react-icons/ri";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utils/validators";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/getServerUrl.js";

function SignUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const redirect = useNavigate();
  const toast = useToast();

  // VALIDATION FOR INPUT FIELDS //

  const validateUsername = (value) => {
    let error;
    if (!value) {
      error = "Username required";
    } else if (!isValidUsername(value)) {
      error = "Invalid username. Please try again";
    }
    return error;
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Email required";
    } else if (!isValidEmail(value)) {
      error = "Invalid email address. Please try again";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password required";
    } else if (!isValidPassword(value)) {
      error = "Invalid password. Please try again";
    }
    return error;
  };

  ///TODO - SOURCE OF ERR FOR IMG UPLOAD?
  const validateImgUpload = (value) => {
    let error;
    if (!value) {
      error = "Please choose a profile picture.";
    }
    return error;
  };
  ///

  ///TODO - CHECK STATE MANAGEMENT
  const attachFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  /// IMG UPLOAD -> CLOUDINARY ///

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log("selectedFile:", selectedFile);
    console.log("formData:", formData);
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(
        baseURL + "/api/users/image-upload",
        requestOptions
      );
      const result = await response.json();
      console.log("Result:", result);
      setImgUrl(result.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  // POST REQ FOR CREATING A NEW USER //

  const registerNewUser = async (values) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("username", values.username);
    urlencoded.append("email", values.email);
    urlencoded.append("password", values.password);
    urlencoded.append("avatar", imgUrl);
    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        baseURL + "/api/users/signup",
        requestOptions
      );
      const results = await response.json();
      console.log("Result:", results);
      toast({
        title: "Registration successful",
        status: "success",
        variant: "subtle",
        duration: 1500,
        isClosable: true,
      });
      redirect("/login");
    } catch (error) {
      console.log("Fetch error", error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        image: "",
      }}
      onSubmit={(values) => {
        console.log(values);
        registerNewUser(values);
      }}
    >
      {(props) => (
        <Form>
          <VStack spacing="4">
            <Field
              id="username"
              name="username"
              type="text"
              validate={validateUsername}
            >
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    {...field}
                    variant="custom"
                    placeholder="e. g. musiclover"
                  />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              id="email"
              name="email"
              type="email"
              validate={validateEmail}
            >
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    variant="custom"
                    placeholder="this@that.com"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field id="password" name="password" validate={validatePassword}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} variant="custom" type="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            ///TODO - FIX IMG UPLOAD
            <Field
              id="image"
              name="image"
              validate={validateImgUpload}
              onChange={attachFileHandler}
            >
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.image && form.touched.image}
                >
                  <FormLabel htmlFor="image">Profile Picture</FormLabel>
                  <Input
                    {...field}
                    variant="flushed"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={attachFileHandler}
                  />
                  <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                  <Center>
                    {selectedFile ? (
                      <IconButton
                        sx={{ bgColor: "green.200" }}
                        w={["80", "40"]}
                        leftIcon={<RiUploadCloud2Line />}
                        p="2"
                        onClick={submitForm}
                      >
                        <Text>Upload</Text>
                      </IconButton>
                    ) : null}
                    {imgUrl ? (
                      <Image
                        borderRadius="full"
                        border="1px"
                        fit="fill"
                        boxSize="32"
                        src={imgUrl}
                        alt="user pic"
                        my="2"
                      />
                    ) : null}
                  </Center>
                </FormControl>
              )}
            </Field>
            <Button
              w={["80", "40"]}
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
