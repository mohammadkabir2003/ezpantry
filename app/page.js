"use client"; // Add this line

import React, { useState, useEffect } from "react";
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
} from "firebase/firestore";
import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import { firestore } from "@/firebase";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [itemName, setNewItem] = useState("");
  const [editNames, setEditNames] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);

  const updateInventory = async () => {
    const snapshot = await getDocs(query(collection(firestore, "inventory")));
    const inventoryList = [];
    snapshot.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList); // Initialize filtered inventory with all items
  };

  const handleAdding = async () => {
    if (itemName.trim() !== "") {
      const docRef = doc(collection(firestore, "inventory"), itemName);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, { count: 1 });
        setNewItem("");
        updateInventory();
      }
    }
  };

  const handleIncrease = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item.name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
      updateInventory();
    }
  };

  const handleDecrease = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item.name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
      updateInventory();
    }
  };

  const handleEditNameChange = (itemName, newName) => {
    setEditNames((prev) => ({ ...prev, [itemName]: newName }));
  };

  const handleUpdate = async (item) => {
    const newName = editNames[item.name];
    if (newName && newName.trim() !== "" && newName !== item.name) {
      const newDocRef = doc(collection(firestore, "inventory"), newName);
      const docSnap = await getDoc(newDocRef);
      if (!docSnap.exists()) {
        await deleteDoc(doc(collection(firestore, "inventory"), item.name));
        await setDoc(newDocRef, { count: item.count });
        setEditNames((prev) => ({ ...prev, [item.name]: "" }));
        updateInventory();
      } else {
        alert("Item with this name already exists.");
      }
    }
  };

  const handleSearch = () => {
    const filtered = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  useEffect(() => {
    updateInventory();
  }, []);

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
            {filteredInventory.map((item) => (
              <Box
                key={item.name}
                height="100px"
                width="auto"
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={4}
                p={2}
                bgcolor="lightgray"
                color="black"
                sx={{ border: "2px solid grey" }}
              >
                <Typography>{item.name}</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleDecrease(item)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.count}</Typography>
                  <IconButton onClick={() => handleIncrease(item)}>
                    <AddIcon />
                  </IconButton>
                  <TextField
                    value={editNames[item.name] || ""}
                    onChange={(e) =>
                      handleEditNameChange(item.name, e.target.value)
                    }
                    placeholder="New name"
                    variant="outlined"
                    size="small"
                    sx={{ width: 120 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(item)}
                    sx={{ ml: 2 }}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box
          width="50%"
          height="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          p={4}
        >
          <Box
            width="100%"
            p={2}
            color="black"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h5" align="center" gutterBottom color="black">
              Have new items to add? Type the new item you want to add below.
            </Typography>
            <TextField
              id="filled-basic"
              label="Add Items"
              variant="filled"
              size="medium"
              value={itemName}
              onChange={(e) => setNewItem(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KitchenIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "darkgrey", color: "white" }}
              onClick={handleAdding}
            >
              Add
            </Button>
          </Box>
          <Box
            width="100%"
            p={2}
            color="black"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h5" align="center" gutterBottom color="black">
              Search for an item in the pantry.
            </Typography>
            <TextField
              id="search-basic"
              label="Search Items"
              variant="filled"
              size="medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "darkgrey", color: "white" }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
