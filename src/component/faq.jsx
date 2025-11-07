import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Faqs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://qtify-backend.labs.crio.do/faq");
        setData(res.data.data);
      } catch (err) {
        console.error("Error in fetching the data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="w-full">
        <h1 className="text-4xl text-white text-center p-3">FAQs</h1>
        <div className="m-auto w-3/4 md:w-2/4">
          {data.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                marginBottom: "10px",
                borderRadius:"5px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "green",
                      fontWeight: "bold",
                      fontSize: "45px",
                    }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ border: "1px solid white", borderRadius: "5px", backgroundColor: "black",
                color: "white", }}
              >
                <Typography component="span">{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "0 0 5px 5px",
                }}
              >
                {item.answer}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
