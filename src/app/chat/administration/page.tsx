"use client";
import { getChattersWithUser, getMessagesWithUser, sendMessage } from "@/api/chatFetch";
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
    useState<ChatParticipantDTO | null>(null);
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [userData, setUserData] = useState<AppUserDTO>();

  useEffect(() => {
    getChattersWithUser()
      .then((chatters) => {
        setChatters(chatters.content);
      })
      .catch((error) => {});

    getUserData()
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => {});
  }, []);

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

  const onMessageSent = (message: string) => {
    if (!selectedContact) {
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
          {selectedContact && userData ? (
            <ChatWindow
              userId={userData.id}
              chatter={selectedContact}
              messages={messages}
              onSendMessage={onMessageSent}
            />
          ) : (
            <div>Select a contact to start chatting</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default withRoles(ChatPage, [AppUserRole.ADMINISTRATION_EMPLOYEE]);
