import React from 'react';
import { ArrowDropDown as ArrowDownIcon } from '@ppe/icons';
import { Button, ButtonGroup, Grow, ClickAwayListener, Paper, Popper, MenuItem, MenuList } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export interface Props {
  options: string[];
  loading?: boolean;
  disabled?: boolean;
  onClick?: (option: string) => void;
}

export const SplitButton = ({ options, loading, disabled, onClick }: Props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorRef}>
        <LoadingButton variant="contained" onClick={() => onClick?.(options[selectedIndex])} loading={loading} disabled={disabled}>
          {options[selectedIndex]}
        </LoadingButton>
        <Button size="small" onClick={() => setOpen(!open)} disabled={loading || disabled} variant="contained">
          <ArrowDownIcon />
        </Button>
      </ButtonGroup>
      <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
