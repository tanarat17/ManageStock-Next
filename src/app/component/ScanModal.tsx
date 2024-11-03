import * as React from 'react';
import { Modal, Typography, Box } from '@mui/material';
import BarcodeScanner from "react-qr-barcode-scanner";
import '../css/styles.css'; // นำเข้า CSS ของคุณ
import CloseIcon from '@mui/icons-material/Close'; // นำเข้าไอคอน Close


interface ScanModalProps {
    open: boolean;
    onClose: () => void;
}

const ScanModal: React.FC<ScanModalProps> = ({ open, onClose }) => {
    const [data, setData] = React.useState<string | null>(null);
    const [scanning, setScanning] = React.useState(false);

    const handleScan = (data: string) => {
        setData(data);
        console.log("Scanned data:", data);
        setScanning(false);
        onClose();
    };

    const handleError = (err: any) => {
        console.error(err);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box 
                sx={{ 
                    padding: 4, 
                    backgroundColor: 'white', 
                    borderRadius: 4, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    width: '90%', // ใช้ความกว้าง 90% ของหน้าจอ
                    maxWidth: 400, // หรือสามารถกำหนดความกว้างสูงสุด
                    margin: 'auto', 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                }}
            >
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: 16, 
                        right: 16, 
                        cursor: 'pointer', 
                        bgcolor: 'red', // สีพื้นหลังของวงกลม
                        borderRadius: '50%', // ทำให้เป็นวงกลม
                        padding: '6px', // ช่องว่างภายในวงกลม
                    }} 
                    onClick={onClose}
                >
                    <CloseIcon sx={{ color: 'white' }} /> {/* กากบาทเป็นสีขาว */}
                </Box>
    
                <Typography id="modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold', fontFamily: 'Anuphan', color: '#000', textAlign: 'center' }}>
                    สแกนบาร์โค้ด
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2, textAlign: 'center', fontFamily: 'Anuphan', color: '#000' }}>
                    สแกนบาร์โค้ดสำหรับตรวจนับสินค้า
                </Typography>
    
                <Box sx={{ my: 3, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <BarcodeScanner
                        onUpdate={(err, result) => {
                            if (result) handleScan(result.text);
                            if (err) handleError(err);
                        }}
                        style={{ width: '100%' }} 
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default ScanModal;
