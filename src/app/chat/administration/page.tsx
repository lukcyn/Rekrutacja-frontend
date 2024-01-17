"use client";
import { deleteChat, getChattersWithUser, getMessagesWithUser, sendMessage } from "@/api/chatFetch";
import { getUserData } from "@/api/userFetch";
import ChatContactList from "@/components/chat/ChatContactList";
import ChatWindow from "@/components/chat/ChatWindow";
import { AppUserRole } from "@/enums/role";
import withRoles from "@/middleware/withRole";
import { AppUserDTO } from "@/types/AppUser";
import { ChatParticipantDTO, MessageContentDTO, MessageDTO } from "@/types/Chat";
import { useEffect, useState } from "react";
import {Container, Row, Col, ListGroup } from "react-bootstrap";

const ChatPage: React.FC = () => {
  const [chatters, setChatters] = useState<ChatParticipantDTO[]>([]);
  const [selectedContact, setSelectedContact] =
    useState<ChatParticipantDTO | undefined>();
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [userData, setUserData] = useState<AppUserDTO>();

  useEffect(() => {
    getUserData()
    .then((userData) => {
      setUserData(userData);
      getChatters();
    })
    .catch((error) => {});
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {

      if(selectedContact != null) {
        console.log("getMessages, chatterId not null!", selectedContact);
        getMessagesWithSelectedUser();        
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedContact]);

  useEffect(() => {
    getMessagesWithSelectedUser();
  }, [selectedContact]);

  const getMessagesWithSelectedUser = () => {
    if (selectedContact == null) {
      setMessages([]);
      return;
    }

    getMessagesWithUser(selectedContact.id)
    .then((messages) => {
      console.log(messages)
      setMessages(messages.content);
    })
    .catch((error) => {});
  }

  const onChatterSelected = (chatter: ChatParticipantDTO) => {
    setSelectedContact(chatter);
  };

  const getChatters = () => {
    getChattersWithUser()
    .then((chatters) => {
      console.log(chatters);
      setChatters(chatters.content);
    })
    .catch((error) => {});
  };

  const onMessageSent = (message: string) => {
    if (!selectedContact || message === "") {
      return;
    }

    const messageData: MessageContentDTO = {
      content: message,
    };

    console.log(messageData);

    sendMessage(selectedContact.id, messageData)
    .then(_ => {
      getMessagesWithSelectedUser();
    })
  };

  const onDisconnectClick = () => {
    if(selectedContact == null)
      return;
    
    deleteChat(selectedContact.id)
    .then(_ => {
      setSelectedContact(undefined);
      getChatters();
    });
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ChatContactList
              onSelectContact={onChatterSelected}
              chatters={chatters}
            />
          </ListGroup>
        </Col>
        <Col sm={8}>
            <ChatWindow
              userData={userData}
              chatterId={selectedContact?.id}
              messages={messages}
              onSendMessage={onMessageSent}
              onDisconnectClick={onDisconnectClick}

            />
        </Col>
      </Row>
    </Container>
  );
};

export default withRoles(ChatPage, [AppUserRole.ADMINISTRATION_EMPLOYEE]);
