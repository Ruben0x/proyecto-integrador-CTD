import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { FacebookShare, TwitterShare, WhatsappShare } from 'react-share-kit';

export default function SimplePopup({ url, title }) {
  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <>
      <IconButton aria-describedby={id} type='button' onClick={handleClick}>
        <ShareIcon color='primary' />
      </IconButton>

      <BasePopup id={id} open={open} anchor={anchor} placement='bottom-start'>
        <PopupBody>
          <FacebookShare size={35} url={url} title={title} />
          <TwitterShare size={35} url={url} title={title} />
          <WhatsappShare size={35} url={url} title={title} separator=' ' />
        </PopupBody>
      </BasePopup>
    </>
  );
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 6px 6px;
  margin: 4px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`
);
