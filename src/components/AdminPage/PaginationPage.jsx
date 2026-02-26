import { Pagination } from '@mui/material'

export default function PaginationPage({ page = 1, count = 1, onChange }) {
  const changePage = (event, value) => {
    if (onChange) onChange(event, value);
  }

  return (
    <Pagination page={page} onChange={changePage} count={count} color="standard" />
  );
}