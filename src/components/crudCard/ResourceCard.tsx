import { Card, Button } from 'react-bootstrap';

interface Props {
  title: string;
  onView: () => void;
  onModify: () => void;
  onDelete: () => void;
}

const ResourceCard: React.FC<Props> = ({ title, onView, onModify, onDelete }) => {
  return (
    <Card className="d-flex flex-row justify-content-between">
      <Card.Body className="display: 'flex', flexDirection: 'column', alignItems: 'flex-start'">
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <Button variant="primary" onClick={onView}>
          Podgląd
        </Button>
        <Button variant="warning" onClick={onModify}>
          Modyfikuj
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Usuń
        </Button>
      </div>
    </Card>
  );
};

export default ResourceCard;
