import React, { useState } from 'react';
import './CreateQuote.css'; 
import quoteImg from './codeimg.jpg'
import { useNavigate } from 'react-router-dom';

const CreateQuote = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  let navigate=useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getMediaURL=async (imgData)=>{
    let apiurl='https://crafto.app/crafto/v1.0/media/assignment/upload';

    try{
        let resp=await fetch(apiurl,{
            method: 'POST',
            // headers: {'Content-Type':'application/json'},
            body: imgData,
        })
        let data=await resp.json();
        console.log(data);
        
        return data;

    }
    catch(err){
        setMessage(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || !image) {
      setMessage('Please provide both text and an image.');
      return;
    }
    // to get mediaUrl
    const imgData=new FormData();
    imgData.append('image',image);

    console.log(imgData);
    let mediaUrl=await getMediaURL(imgData);
    console.log(mediaUrl[0].url);
    mediaUrl=mediaUrl[0].url;
    console.log(localStorage.getItem('token'))

    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);

    const apiUrl = 'https://assignment.stage.crafto.app/postQuote';

    try {
        console.log(text+" "+mediaUrl);
      const response = await fetch(apiUrl, {
        method: 'post',
        headers:{
            'Content-Type': 'application/json', 
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            'text':text,
            'mediaUrl':mediaUrl
        }),
      });

      if (response.ok) {
        let quo=await response.json();
        console.log(quo);
        setMessage('Upload successful!');
        setText('');
        setImage(null);
        alert('Successful upload');
        navigate('/quotes')
        
      } else {
        console.log(response)
        const error = await response.json();
        setMessage(`Upload failed: ${error.message}`);
        alert('please login again');
        navigate('/')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={handleSubmit}>
        <h2 className="upload-title">Upload Text and Image</h2>

        <div className="form-group">
          <label htmlFor="imageUpload">Upload Image</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="textArea">Enter Text</label>
          <textarea
            id="textArea"
            rows="4"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="upload-button">
          Submit
        </button>

        {message && <p className="upload-message">{message}</p>}
      </form>
    </div>
  );
};

export default CreateQuote;
