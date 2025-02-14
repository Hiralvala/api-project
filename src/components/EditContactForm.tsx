import React, { useState } from "react";
interface EditContactProps{
    contact:{
        _id:string;
        name:string;
        email:string;
        phoneNumber:string;
    };
    onCancel:()=>void;
    onSave:()=>void;
}
function EditContactForm({contact,onCancel,onSave}:EditContactProps){
    const[formData, setFormData]=useState({
        name:contact.name,
        email:contact.email,
        phoneNumber:contact.phoneNumber,
    })
    const handlesubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const response= await fetch(`api/edit-contact/${contact._id}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(formData) 
            })
            if(!response.ok){
                throw new Error('Failed to update contact')
            }
            onSave();
        }catch(error){
            console.error('Error updating contact:', error);
            alert('Failed to update contact');
        }
    }
 return(
    <form onSubmit={handlesubmit} className="w-full space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required/>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required/>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" value={formData.phoneNumber} onChange={(e)=>setFormData({...formData, phoneNumber:e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required/>
        </div> <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
 )
}

export default EditContactForm;