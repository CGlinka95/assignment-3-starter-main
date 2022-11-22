import Avatar from "@mui/material/Avatar";
import { blue, blueGrey } from "@mui/material/colors";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function FavouriteBooks(props) {
  return (
    <TableBody>
      <TableRow>
        <TableCell>{props.title}</TableCell>
        <TableCell>{props.author}</TableCell>
        <TableCell>
          <Avatar sx={{ bgcolor: blue[200] }}>{props.rating}</Avatar>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
