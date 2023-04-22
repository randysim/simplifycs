import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from "@mui/material";
import { useState } from "react";

export default function ConfirmationDialog({
    title,
    description,
    open,
    onCancel,
    onConfirm,
    onClose,
  }) {
    const [isOpen, setOpen] = useState(false);
  
    if (open && !isOpen) setOpen(true);
  
    return (
      <div>
        <Dialog open={isOpen}>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && (
            <DialogContent>
              <DialogContentText>{description}</DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                onClose();
                if (onCancel) onCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                onClose();
                if (onConfirm) onConfirm();
              }}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }