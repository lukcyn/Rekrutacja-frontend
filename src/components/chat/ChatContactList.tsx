import { ChatParticipantDTO } from "@/types/Chat";
import { ListGroup } from "react-bootstrap";

interface ChatContactListProps {
    onSelectContact: (chatter: ChatParticipantDTO) => void;
    chatters: ChatParticipantDTO[];
  }
  
  const ChatContactList: React.FC<ChatContactListProps> = ({ 
    onSelectContact,
    chatters 
  }) => {
    return (
      <div>
        <h3>Contact List</h3>
        <ListGroup>
          {chatters.map((chatter) => (
            <ListGroup.Item
              key={chatter.id}
              action
              onClick={() => onSelectContact(chatter)}
            >
              {chatter.name + ' ' + chatter.surname}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  };
  
export default ChatContactList;