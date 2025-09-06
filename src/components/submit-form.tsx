"use client"

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from '@/components/ui/button';
import { ReactNode } from "react";

export default function SubmitForm({buttonName}: {buttonName: ReactNode}){
    const {pending} = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>{pending ? <Loader2 className="h-4 w-4 animate-spin"/> : buttonName}</Button>
    )
}