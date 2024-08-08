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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faCalendarDays,
  faTicket,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Unstable_Grid2";
function MyOrdersProfil() {
  return (
    <div className={style.cards}>
      <div
        className={style.card}
        style={{
          border: "1px solid #c5bcbc",
          // padding: "15px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          style={{ padding: "15px" }}
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
        <footer style={{ borderTop: "1px solid #f5f7f9", padding: "15px" }}>
          <Grid container spacing={2}>
            <Grid xs={6} md={6} className={style.gridFooter}>
              <div className={style.icons}>
                <FontAwesomeIcon className={style.icon} icon={faCalendarDays} />
              </div>
              <div className={style.title}>
                <p>Event Starts on</p>
                <h6>01 June 2022</h6>
              </div>
            </Grid>
            <Grid xs={6} md={6} className={style.gridFooter}>
              <div className={style.icons}>
                <FontAwesomeIcon className={style.icon} icon={faTicket} />
              </div>
              <div className={style.title}>
                <p>Total Tickets</p>
                <h6>1</h6>
              </div>
            </Grid>
            <Grid xs={6} md={6} className={style.gridFooter}>
              <div className={style.icons}>
                <FontAwesomeIcon className={style.icon} icon={faMoneyBill} />
              </div>
              <div className={style.title}>
                <p>Paid Amount</p>
                <h6>AUD $50.00</h6>
              </div>
            </Grid>
            <Grid xs={6} md={6} className={style.gridFooter}>
              <div className={style.icons}>
                <FontAwesomeIcon className={style.icon} icon={faMoneyBill} />
              </div>
              <div className={style.title}>
                <p>Invoice</p>
                <h6>Download</h6>
              </div>
            </Grid>
          </Grid>
        </footer>
      </div>
    </div>
  );
}

export default MyOrdersProfil;
