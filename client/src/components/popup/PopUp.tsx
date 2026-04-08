import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { Stamp } from 'lucide-react'
import React, { type PropsWithChildren } from 'react'

interface PopUpProps extends PropsWithChildren {
    lable: string
}

const PopUp: React.FC<PopUpProps> = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#1F263B',
        border: '1px solid #545E71',
        boxShadow: 24,
        p: 3,
        borderRadius: '20px'
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <button
                onClick={() => handleOpen()}
                className="text-button-primary hover:text-button-primary/70 font-bold cursor-pointer">{props.lable}</button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {props.children}
                </Box>
            </Modal>
        </div>
    )
}

export default PopUp