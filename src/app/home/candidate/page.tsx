"use client";
import { useSubmitResult } from "@/context/submitApplicationResultContext";
import { AppUserRole } from "@/enums/role";
import withRoles from "@/middleware/withRole";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const CandidateHome = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { submitResult, setResult } = useSubmitResult()

  useEffect(() => {
    if(submitResult != null) {
      setModalIsOpen(true)
    }
  }, [submitResult, setResult])

  const handleClose = () => {
    setResult(null)
    setModalIsOpen(false)
  }

  return (
    <div>
      <Modal show={modalIsOpen}>
        <Modal.Header>
          <Modal.Title>Popup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitResult}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
      This is candidate home page
    </div>
  )
}

export default withRoles(CandidateHome, [AppUserRole.CANDIDATE]);
