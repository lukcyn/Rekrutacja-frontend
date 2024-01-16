import { ChatParticipantDTO, MessageDTO } from "@/types/Chat";
import { useState, useRef, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

interface ChatWindowProps {
    chatter: ChatParticipantDTO;
    messages: MessageDTO[];
    onSendMessage: (message: string) => void;
  }

const ChatWindow: React.FC<ChatWindowProps> = ({ chatter, messages, onSendMessage }) => {
    const [message, setMessage] = useState<string>('');
    const chatHistoryRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (chatHistoryRef.current) {
        chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
      }
    }, [messages]);
  
    const handleSendMessage = () => {
      if (message) {
        onSendMessage(message);
        setMessage('');
      }
    };
  
    return (
      <div>
        <h3>Chat with {chatter.name + ' ' + chatter.surname}</h3>
        <Card>
          <Card.Body>
            <div
              className="chat-history"
              ref={chatHistoryRef}
              style={{
                maxHeight: '300px',
                height: '300px',
                overflowY: 'auto',
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.senderId === chatter.id ? 'message-left' : 'message-right'}
                >
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Wpisz wiadomość"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  };

  export default ChatWindow;