import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

interface SearchBarProps {
  initialText: string;
  onSubmit: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialText, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState(initialText);

  const submitWrapperForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(searchTerm);
  };

  const submitWrapper = () => {
    onSubmit(searchTerm);
  };

  return (
    <Form className="d-flex justify-content-center align-items-center w-100" onSubmit={submitWrapperForm}>
      <FormControl
        type="text"
        placeholder="Nazwa rekrutacji"
        className="mr-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outline-success" onClick={submitWrapper}>
        Szukaj
      </Button>
    </Form>
  );
};

export default SearchBar;
