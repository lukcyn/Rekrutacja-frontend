"use client";
import { testApiCall } from "@/api/testFetch"
import { useEffect } from "react"
import SubmittingApplication from "../submitting-applications/submitting-applications";

export default function Test() {
  
  useEffect(() => {
    testApiCall();
  }, [])
  
  return (
    <div>
      <div>This is a test page at url/test</div>
    </div>
  
  )
}
