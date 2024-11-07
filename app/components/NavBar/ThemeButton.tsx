import * as React from "react"

import { MdLightMode, MdDarkMode } from 'react-icons/md';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export  default function ThemeButton() {
  return (
    <Select>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder={<MdLightMode />}/> 
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="est"><MdLightMode /></SelectItem>
          <SelectItem value="cst"><MdDarkMode /></SelectItem>
          <SelectItem value="mst" className="font-bold">system</SelectItem>
     </SelectGroup>
      </SelectContent>
    </Select>
  )
}
