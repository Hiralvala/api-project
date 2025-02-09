"use client"
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlesubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name,email,phoneNumber})
      })

      const data=await response.json();
      if(response.ok){
        console.log("Form submitted successfully",data.message);
        setName("");
        setEmail("");
        setPhoneNumber("");
        alert('Form submitted successfully!');
      }else{
        console.log("Form submission failed: ",response.status, data.message)
        alert(`Form submission failed: ${data.message}`)
      }
    }catch(error){
      console.log("Error submitting form:", error);
      alert('An error occurred while submitting the form.');
    }finally {
      setIsLoading(false);
    }
  };
  return (
    <>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handlesubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
          
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
          

          
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
          

          
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
          

          <button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"> {isLoading ? 'Submitting...' : 'Submit'}</button>
        </form>
    </>
  );
}
