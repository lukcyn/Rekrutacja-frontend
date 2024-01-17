import { ChatParticipantDTO, MessageDTO } from "@/types/Chat";
import { useState, useRef, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "@/components/chat/Chat.css";
import { AppUserDTO } from "@/types/AppUser";

interface ChatWindowProps {
  userData?: AppUserDTO;
  chatterId?: number;
  messages: MessageDTO[];
  onSendMessage: (message: string) => void;
  onDisconnectClick: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  userData,
  chatterId,
  messages,
  onSendMessage,
  onDisconnectClick,
}) => {
  const [message, setMessage] = useState<string>("");
  const chatHistoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div>
      <Card>
        <Card.Header style={{height: "50px"}}>
          { chatterId && 
            <Button variant="danger" onClick={onDisconnectClick}>
              Rozłącz
            </Button>
          }
        </Card.Header>
        <Card.Body>
          <div
            className="chat-history"
            ref={chatHistoryRef}
            style={{
              maxHeight: "300px",
              height: "300px",
              overflowY: "auto",
            }}
          >
            {userData && messages.map((msg, index) => (
              <div
                className={`d-flex ${
                  msg.senderId === userData.id
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
                key={index}
              >
                <div
                  className={
                    msg.senderId === userData.id
                      ? "message message-right"
                      : "message message-left"
                  }
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Wpisz wiadomość"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChatWindow;
