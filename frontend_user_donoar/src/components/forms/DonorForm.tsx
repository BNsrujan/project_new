import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/utils/axiosInstance'; // Adjust the import path as necessary
import { zodResolver } from "@hookform/resolvers/zod"
import type { DonorFormValues } from "@/types/donor"
import { donorSchema } from "@/lib/validations/donor"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { FormField } from "./FormField"
import { BloodTypeSelect } from "./BloodTypeSelect"
import { useDonorSubmit } from "@/hooks/useDonorSubmit"

interface DonorFormProps {
  onClose: () => void
}

export function DonorForm({ onClose }: DonorFormProps) {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<DonorFormValues>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  })
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/donor/register', data);
      console.log('Response:', response.data);
      toast({
        title: "Registration successful!",
        description: "Thank you for registering as a donor.",
      })
      navigate('/profile')
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8 max-w-md"
    >
      <div className="bg-white p-8 rounded-lg shadow-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-2xl font-bold mb-6">Register as a Donor</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            id="name"
            label="Name"
            register={register("name")}
            error={form.formState.errors.name?.message}
            className="w-full"
          />

          <FormField
            id="email"
            label="Email"
            type="email"
            register={register("email")}
            error={form.formState.errors.email?.message}
            className="w-full"
          />

          <FormField
            id="phone"
            label="Phone"
            type="tel"
            register={register("phone")}
            error={form.formState.errors.phone?.message}
            className="w-full"
          />

          <BloodTypeSelect
            error={form.formState.errors.bloodType?.message}
            onValueChange={(value) => form.setValue("bloodType", value as any)}
          />

          <FormField
            id="address"
            label="Address"
            register={register("address")}
            error={form.formState.errors.address?.message}
            className="w-full"
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Register as Donor'}
          </Button>
        </form>
      </div>
    </motion.div>
  )
}