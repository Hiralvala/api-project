"use client"
import { useEffect, useState } from 'react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch('/api/get-contact');
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  const handleDelete=async (id:string)=>{
    if(window.confirm('Are you sure you want to delete this contact?')){
      try{
        const response=await fetch(`api/delete-contact/${id}`,{
          method:'DELETE'
        })
        if(!response.ok){
          throw new Error('Failed to delete contact')
        }
        setContacts(contacts.filter(contact=>contact._id!==id));
      }catch(error){
        console.log("Error deleting contact:", error)
        alert('failed to delete contact')
      }
    }
  }
  const handleEdit=()=>{

  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div key={contact._id} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
            <h3 className="font-bold">{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.phoneNumber}</p>
            <p className="text-sm text-gray-500">
              {new Date(contact.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className='flex gap-2'>
            <button className='p-2 bg-red-600 rounded-lg text-white' onClick={()=>handleDelete(contact._id)}>Delete</button>
            <button className='p-2 bg-green-600 rounded-lg text-white' onClick={handleEdit}>Edit</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}