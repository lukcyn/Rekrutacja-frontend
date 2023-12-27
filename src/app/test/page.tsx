"use client";
import { testApiCall } from "@/api/testFetch"
import { useEffect } from "react"

export default function Test() {
  
  useEffect(() => {
    testApiCall();
  }, [])
  
  return (
    <div>This is a test page at url/test</div>
  )
}
