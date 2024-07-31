import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";

const list = [
  "eggs",
  "milk",
  "bread",
  "rice",
  "carrot",
  "mango",
  "banana",
  "nuts",
  "berries",
  "fruits",
  "apples",
  "tomatos",
];

export default function Home() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection={"column"}
      bgcolor="white"
    >
      <Box
        width="auto"
        height="100px"
        display={"flex"}
        justifyContent={"center"}
        alignContent="center"
        color="black"
        py={4}
      >
        <Typography variant="h2" align="center">
          EZPantry
        </Typography>
      </Box>
      <Box
        width="auto"
        height="100px"
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
        color="black"
        py={4}
      >
        <Typography variant="h4" align="center">
          Keep track of everything in your pantry.
        </Typography>
      </Box>
      <Box
        width="100%"
        height="400px"
        bgcolor="lightgrey"
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
        p={4}
      >
        <Box
          width="50%"
          height="300px"
          p={2}
          color="black"
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="h5" align="center" gutterBottom color="black">
              Have new items to add? Type the new item you want to add below.
            </Typography>
            <TextField
              id="filled-basic"
              label="Add Items"
              variant="filled"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KitchenIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Box
          width="50%"
          height="400px"
          display="flex"
          flexDirection="column"
          py={4}
        >
          <Typography variant="h5" align="center" gutterBottom color="black">
            List of Items in the Pantry
          </Typography>
          <Stack
            width="100%"
            height="auto"
            spacing={2}
            overflow={"auto"}
            px={8}
          >
            {list.map((i) => (
              <Box
                key={i}
                height="100px"
                width="auto"
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={4}
                p={2}
                bgcolor="lightgray"
                color="black"
                sx={{ border: "2px solid grey" }}
              >
                <Typography>{i}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
