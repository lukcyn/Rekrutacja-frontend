"use client";
import { deleteChat, findEmployeeAndSendFirstMessage, getMessagesWithUser, sendMessage } from "@/api/chatFetch";
import { getUserData } from "@/api/userFetch";
import ChatWindow from "@/components/chat/ChatWindow";
import { AppUserRole } from "@/enums/role";
import withRoles from "@/middleware/withRole";
import { AppUserDTO } from "@/types/AppUser";
import { MessageContentDTO, MessageDTO } from "@/types/Chat";
import { useEffect, useRef, useState } from "react";
import {Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatPageCandidate: React.FC = () => {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [userData, setUserData] = useState<AppUserDTO>();
  const [chatterId, setChatterId] = useState<number | undefined>();

  useEffect(() => {
    getUserData()
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {

      if(chatterId != null) {
        getMessagesWithUser(chatterId)
        .then((messages) => {
          setMessages(messages.content);
          console.log("getMessages", messages.content);
        });
        
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getMessages = (chatterId: number) => {
    console.log("getMessages", chatterId);
    if (chatterId == null) {
      console.log("ChatterId is null")
      setMessages([]);
      return;
    }

    getMessagesWithUser(chatterId)
    .then((messages) => {
      setMessages(messages.content);
      console.log("getMessages", messages.content);
    })
    .catch((_) => {});
  }

  const onMessageSent = (message: string) => {
    if(message === "") {
      toast.error("Wiadomość nie może być pusta!");
      return;
    }

    if (!chatterId) {
      sendFirstMessage(message);
      return;
    }

    sendAnotherMessage(chatterId, message);
  };

  const onDisconnectClick = () => {
        if(chatterId != null) {
            deleteChat(chatterId)
            .then(_ => {
        });
    }
  }

  const sendAnotherMessage = (chatterId: number, message: string) => {
    const messageData: MessageContentDTO = {
      content: message,
    };

    sendMessage(chatterId, messageData)
    .then(_ => {
      console.log("sendAnotherMessage");
      getMessages(chatterId);
    })
  }

  const sendFirstMessage = (message: string) => {
    const messageData: MessageContentDTO = {
      content: message,
    };

    findEmployeeAndSendFirstMessage(messageData)
    .then(data => {
      console.log(data);
      setChatterId(data.receiverId);
      getMessages(data.receiverId);
    })
    .catch(error => {
      if(error.response.status != 404)
        throw error;

      toast.error("Nie znaleziono pracownika! Spróbuj ponownie później.");
    });
  }

  return (
    <>
      <ToastContainer />
      <Container fluid>
        <Row>
        <ChatWindow
          userData={userData}
          chatterId={chatterId}
          messages={messages}
          onSendMessage={onMessageSent}
          onDisconnectClick={onDisconnectClick}
          />
        </Row>
      </Container>
    </>
  );
};

export default withRoles(ChatPageCandidate, [AppUserRole.CANDIDATE]);
