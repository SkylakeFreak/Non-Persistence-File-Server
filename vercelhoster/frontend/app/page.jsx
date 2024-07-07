"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import img1 from "../app/rotor.png"
const FileUploadDownload = () => {
    const [uploadFile, setUploadFile] = useState(null);
    const [newFileName, setNewFileName] = useState('');
    const [searchFileName, setSearchFileName] = useState('');
    const [code, setCode] = useState("");

    const handleUploadSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('file2', newFileName);
        formData.append('code', code);

        try {
            const response = await fetch('https://vercelhoster.vercel.app/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('File uploaded and renamed successfully');
            } else {
                alert('Error uploading file');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading file');
        }
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://vercelhoster.vercel.app/download/${searchFileName}`);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = searchFileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else if (response.status === 404) {
                alert('File not found');
            } else {
                alert('Error downloading file');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error downloading the file');
        }
    };

    return (
      <div className='h- items-center flex justify-center'>
         <div className="container h-full w-[90vw] max-w-[800px] mx-auto p-8 mt-[2vh] bg-gray-100 rounded-lg shadow-lg">
          <div className='flex mb-8 items-center justify-around'> <h1 className="text-1xl font-bold h-full flex itm text-center text-gray-800">Universal File Server</h1>
          <div className='flex text-center justify-center items-center gap-2'>
          <p className='text-black'>Listening...</p>

<Image id='rotor' width={60} src={img1}></Image></div>
          </div>
          
           
            <div className='outline outline-2 shadow-xl mb-10 outline-black p-1'>
            <h1 className='text-lg text-black mb-2'>512MB <span className='text-red-500 font-bold text-xl'>
            Non Persistence</span></h1>
            <h1 className='text-md text-black mb-2'>MP4, PDF, JPEG, JPG, PNG, MP3 ...</h1>
            <h1 className='text-lg text-black mb-2'>Your File will be stored with
              <span className='font-bold'> Code + Filename</span>  you select.</h1>
            <h1 className='text-lg text-black mb-2'>Retrieve with <span className='font-bold'>Code+Filename+Extension</span> </h1>
            </div>
            
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upload File</h2>
            <form onSubmit={handleUploadSubmit} className="mb-12">
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Select File:</label>
                    <input 
                        type="file" 
                        onChange={(e) => setUploadFile(e.target.files[0])} 
                        required 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-600">New File Name:</label>
                    <input 
                        type="text" 
                        value={newFileName} 
                        onChange={(e) => setNewFileName(e.target.value)} 
                        placeholder="New File Name" 
                        required 
                        className="block w-full p-2 border text-black border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Safety Code:</label>
                    <input 
                        type="text" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)} 
                        placeholder="Safety Code" 
                        required 
                        className="block w-full p-2 border text-black border-gray-300 rounded-lg"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
                    Upload
                </button>
            </form>
            
            <h2 className="text-2xl h-f font-semibold mb-4 text-gray-700">Search and Download File</h2>
            <form onSubmit={handleSearchSubmit}>
                <div className="mb-6 flex flex-col justify-center gap-3">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Enter File Name:</label>
                    <input 
                        type="text" 
                        value={searchFileName} 
                        onChange={(e) => setSearchFileName(e.target.value)} 
                        placeholder="Enter File Name" 
                        required 
                        className="block w-full p-2 border text-black border-gray-300 rounded-lg"
                    />
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">
                    Download
                </button>
                </div>
                
            </form>
            
        </div>
        
      </div>
       
    );
};

export default FileUploadDownload;
