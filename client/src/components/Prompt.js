import React, { useState, createContext, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { useContext } from 'react';

export function useConfirm() {
  const { confirm } = useContext(PromptContext)

  return confirm
}

export const PromptContext = createContext();

export default function ({ children }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});
  const [resolveReject, setResolveReject] = useState([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((options) => {
    setOptions(options);
    return new Promise((resolve, reject) => {
      setResolveReject([resolve, reject]);
      setOpen(true);
    });
  });

  function handleCloseClicked(agreement) {
    setOpen(false);
    resolve(agreement);
  }

  return (
    <>
      <PromptContext.Provider value={{ confirm }}>
        <div>
          <Dialog
            open={open}
            onClose={(e) => handleCloseClicked('disagree')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{options.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {options.text}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => handleCloseClicked('disagree')}>
                Disagree
              </Button>
              <Button onClick={(e) => handleCloseClicked('agree')} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        {children}
      </PromptContext.Provider>
    </>
  );
}
