import { MenuItem, Typography } from '@mui/material';

export default function MenuSetting(props) {
  return (
    <>
      <MenuItem onClick={props.navigateTo}>
        <Typography textAlign="center">{props.menuName}</Typography>
      </MenuItem>
    </>
  )
}
