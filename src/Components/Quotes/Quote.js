import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import './Quote.css'

const Quote = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentdata,setCurrentdata]=useState([]);
  const itemsPerPage = 10;
  let navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://assignment.stage.crafto.app/getQuotes?limit=200&offset=2',{
            method:'get',
            headers:{
                'Authorization':`${localStorage.getItem('token')}`
            }
        });
        if(response.ok){
            let wholedata=await response.json();
            console.log(wholedata.data.data);
            setData(wholedata.data);
        }
        else{
            alert('please login first');
            navigate('/')
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  console.log("--->>",data);
  let currentData=[];
  if(data){
    console.log("inside if "+data)
    currentData = data.slice(startIndex, endIndex);
    
  }
  

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Paginated Data
      </Typography>
      
        <button onClick={()=> navigate('/createquote')} id="quoteButton">Create New Quote</button>
      

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Grid container spacing={2}>
            {currentData && currentData.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card img={item.mediaUrl} uname={item.username} text={item.text} time={item.createdAt} />
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Quote;
