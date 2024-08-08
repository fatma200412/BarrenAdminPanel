import React from "react";
import style from "./index.module.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

function HomeProfil() {
  return (
    <>
      <div className={style.cards}>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          style={{
            border: "1px solid #c5bcbc",
            padding: "10px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Image
            objectFit="cover"
            // maxW={{ base: "100%", sm: "200px" }}
            width={150}
            height={100}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack style={{ padding: "15px 15px" }}>
            <CardBody>
              <Heading
                size="md"
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  textDecoration: "none solid rgb(0, 0, 0)",
                  marginBottom: "10px",
                }}
              >
                Step Up Open Mic Show
              </Heading>

              <Text
                py="2"
                style={{
                  color: "#212529",
                  fontSize: "14px",
                  fontWeight: "400",
                  textDecoration: "none solid rgb(33, 37, 41)",
                  marginBottom: "17px",
                }}
              >
                Thu, Jun 30, 2022 4:30 AM
              </Text>
            </CardBody>
          </Stack>
        </Card>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          style={{
            border: "1px solid #c5bcbc",
            padding: "10px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Image
            objectFit="cover"
            // maxW={{ base: "100%", sm: "200px" }}
            width={150}
            height={100}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack style={{ padding: "15px 15px" }}>
            <CardBody>
              <Heading
                size="md"
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  textDecoration: "none solid rgb(0, 0, 0)",
                  marginBottom: "10px",
                }}
              >
                Step Up Open Mic Show
              </Heading>

              <Text
                py="2"
                style={{
                  color: "#212529",
                  fontSize: "14px",
                  fontWeight: "400",
                  textDecoration: "none solid rgb(33, 37, 41)",
                  marginBottom: "17px",
                }}
              >
                Thu, Jun 30, 2022 4:30 AM
              </Text>
            </CardBody>
          </Stack>
        </Card>
      </div>
    </>
  );
}

export default HomeProfil;
