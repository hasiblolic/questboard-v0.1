import { Link, MenuItem } from '@mui/material';

export default function MenuSetting(props) {

  return (
    <>
      <MenuItem>
        <Link
          underline='none'
          href={props.navigationDestination}
        >
          {props.menuName}
        </Link>
      </MenuItem>
    </>
  )
}
