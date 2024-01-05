import { Pagination } from "react-bootstrap";

interface Props {
  total: number;
  current: number;
  onClick: (page: number) => void;
}

const PaginationBar = ({ total, current, onClick }: Props) => {
  console.log(current, total);
    return (
    <Pagination>
      {total > 3 && <Pagination.First onClick={() => onClick(0)} />}
      <Pagination.Prev
        disabled={!(current > 0 && total > 0)}
        onClick={() => onClick(current - 1)}
      />
      {current - 1 >= 0 && (
        <Pagination.Item onClick={() => onClick(current - 1)}>
          {current}
        </Pagination.Item>
      )}
      <Pagination.Item active>{current + 1}</Pagination.Item>
      {current + 1 < total && (
        <Pagination.Item onClick={() => onClick(current + 1)}>
          {current + 2}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={!(current < total - 1)}
        onClick={() => onClick(current + 1)}
      />
      {total > 3 && <Pagination.Last onClick={() => onClick(total - 1)} />}
    </Pagination>
  );
};

export default PaginationBar;
