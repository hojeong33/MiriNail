import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Paginations = () => {
  return (
    <>
      <Stack spacing={2} className="dd">
        <Pagination count={5} shape="rounded" />
        <Pagination count={5} variant="outlined" shape="rounded" />
      </Stack>
    </>
  );
};

const Paginations2 = () => {
  return (
    <>
      <Stack spacing={2} className="dd">
        <Pagination count={5} variant="outlined" shape="rounded" />
      </Stack>
    </>
  );
};

export { Paginations, Paginations2 };
