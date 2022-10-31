import React, { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';

import AllPagesPDFViewer from "./Components/pdfDisplay";
import samplePDF from "./output3.pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./styles.css";

export default function App() {
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const [open, setOpen] =useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [wrong, setWrong] =useState('');

  const handleChange = (event) => {
    setWrong(event.target.value);
  };

  const [right, setRight] =useState('');

  const handleChange1 = (event) => {
    setRight(event.target.value);
  };

  const postfeedback=()=>{
    fetch("https://29q0i5.deta.dev/feedback?correct="+right+"&wrong="+wrong , {
      method: 'POST',
      body:'',
       headers: {
        'Content-Type': 'application/json'
    },})
    .then(response=>{
      setOpen(false);
      toast("Feedback sent!")
    })
    .catch((error) => console.error('Error:', error))
  }

  return (
    <div className="App">
      {/* <h4>Single Page</h4>
      <SinglePagePDFViewer pdf={samplePDF} />

      <hr /> */}
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" />

      <h4>Pdf display</h4>
      <div className="all-page-container">
        <AllPagesPDFViewer pdf={samplePDF} />
      </div>

      <hr />
      <Button onClick={handleOpen}>Feedback</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                      Is there any wrong label?
                    </Typography>
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Wrong class</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={wrong}
                              label="Wrong class"
                              onChange={handleChange}
                            >
                              <MenuItem value={"Error codes"}>Error codes</MenuItem>
                              <MenuItem value={"Psdb codes"}>Psdb codes</MenuItem>
                              <MenuItem value={"Service/diagnostic tools"}>Service/diagnostic tools</MenuItem>
                              <MenuItem value={"Remote Command"}>Remote Command</MenuItem>
                            </Select>
                          </FormControl>                      
                          <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Right Class</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={right}
                                label="Right Class"
                                onChange={handleChange1}
                              >
                              <MenuItem value={"Error codes"}>Error codes</MenuItem>
                                <MenuItem value={"Psdb codes"}>Psdb codes</MenuItem>
                                <MenuItem value={"Service/diagnostic tools"}>Service/diagnostic tools</MenuItem>
                                <MenuItem value={"Remote Command"}>Remote Command</MenuItem>
                              </Select>
                            </FormControl>
                            <Button variant="contained" onClick={postfeedback}>Post</Button>
                    </Box>
          </Box>
        </Modal>
    </div>
  );
}