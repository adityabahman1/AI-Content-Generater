'use client'
import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateList'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput : any,
  loading : boolean
}

const FormSection = ({ selectedTemplate , userFormInput , loading}: PROPS) => {

    const [formData, setformData] = useState<any>();

    const handleInputChange = (event:any)=>{
        const {name,value} = event.target;
        setformData({...formData,[name]:value})
    }

    const onSubmit =(e:any)=>{
        e.preventDefault();
        userFormInput(formData)
    }
  return (
    <div className='p-5 shadow-md border rounded-lg bg-white'>
      {selectedTemplate?.icon && (
        <Image src={selectedTemplate.icon} alt='icon' width={70} height={70} />
      )}
      <h2 className='font-bold text-2xl mb-2 text-primary'>
        {selectedTemplate?.name}
      </h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

      <form action="" className='mt-4 space-y-4' onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index}>
            <label htmlFor={item.name} className='block mb-1 font-bold'>
              {item.label}
            </label>
            {item.field === 'input' ? (
              <Input name={item.name} required={item.required} onChange={handleInputChange} />
            ) : item.field === 'textarea' ? (
              <Textarea name={item.name} required={item?.required} onChange={handleInputChange}  />
            ) : null}
          </div>
        ))}
        <Button type='submit' className='w-full py-6' disabled={loading}>
            {loading&&<Loader2Icon className='animate-spine'/>}
            Generate Content</Button>
      </form>
    </div>
  );
}

export default FormSection;
