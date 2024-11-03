import React, { useState } from 'react';
import '../../css/styles.css';
import { Modal, Box, TextField, Button, Typography, MenuItem, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faUpload, faCamera ,faBox  } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';

const ExProduct: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const theme = createTheme({
        typography: {
            fontFamily: 'Anuphan, Arial, sans-serif',
        },
    });

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [remaining, setRemaining] = useState('');
    const [date, setDate] = useState('');
    const [exportedBy, setExportedBy] = useState('');
    const [witness, setWitness] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ productId, productName, quantity, remaining, date, exportedBy, witness, imageSrc });
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setImageSrc(null);
        setProductId('');
        setProductName('');
        setQuantity('');
        setRemaining('');
        setDate('');
        setExportedBy('');
        setWitness('');
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        padding: { xs: 2, sm: 4 },
                        backgroundColor: 'white',
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: { xs: '90%', sm: 600, md: 700 },
                        width: '90%',
                        maxHeight: '80%',
                        overflowY: 'auto',
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
                            top: 8, 
                            right: 8, 
                            cursor: 'pointer', 
                            bgcolor: 'red', 
                            borderRadius: '50%', 
                            padding: '4px' 
                        }} 
                        onClick={onClose}
                    >
                        <CloseIcon sx={{ color: 'white' }} />
                    </Box>
                    <Typography 
                        variant="h6" 
                        component="h2" 
                        sx={{ 
                            fontWeight: 'bold', 
                            fontFamily: 'Anuphan', 
                            color: '#000',
                            fontSize: { xs: '1.5rem', sm: '1.8rem' },
                            mt: 2,
                            mb: 2
                        }}
                    >
                        จ่ายออกสินค้า
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed #4CAF50',
                            borderRadius: 2,
                            padding: 4,
                            bgcolor: '#f9f9f9',
                        }}>
                             <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Anuphan', color: '#cf813e', display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faBox} style={{ fontSize: '24px', marginRight: '8px' }} /> {/* กำหนดขนาดไอคอนที่นี่ */}
                              
                            </Typography>
                            {/* <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                onChange={handleImageChange}
                            /> */}
                            {/* <label htmlFor="image-upload">
                                <Button
                                    variant="contained"
                                    component="span"
                                    sx={{
                                        bgcolor: '#f5b62f',
                                        color: 'white',
                                        '&:hover': { bgcolor: '#f5ab0c' },
                                        padding: '10px 20px',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUpload} />
                                </Button>
                            </label> */}

                            {imageSrc && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Image
                                        src={imageSrc}
                                        alt="Product"
                                        width={200}
                                        height={200}
                                        style={{ borderRadius: '10%', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}
                                    />
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="รหัสสินค้า"
                                variant="outlined"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    marginLeft: 1,
                                    height: '56px',
                                    backgroundColor: '#bd5e68',
                                    '&:hover': { backgroundColor: '#bf3d4b' },
                                }}
                            >
                                <FontAwesomeIcon icon={faBarcode} style={{ margin: '8px' }} />
                            </Button>
                        </Box>

                        <TextField
                            label="ชื่อสินค้า"
                            variant="outlined"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            fullWidth
                        />

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="จำนวน"
                                variant="outlined"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                sx={{ flex: 1, mr: 1 }}
                            />
                            <TextField
                                label="คงเหลือ"
                                variant="outlined"
                                type="number"
                                value={remaining}
                                onChange={(e) => setRemaining(e.target.value)}
                                sx={{ flex: 1 }}
                            />
                        </Box>

                        <TextField
                            label="วันที่ส่งออกสินค้า"
                            type="date"
                            variant="outlined"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label="ส่งออกโดย"
                            variant="outlined"
                            value={exportedBy}
                            onChange={(e) => setExportedBy(e.target.value)}
                        />

                        <TextField
                            label="พยาน"
                            variant="outlined"
                            value={witness}
                            onChange={(e) => setWitness(e.target.value)}
                        />

                        <Button 
                            type="submit"
                            variant="contained" 
                            color="primary" 
                            sx={{ bgcolor: '#4CAF50', color: 'white', '&:hover': { bgcolor: '#45a049' } }}
                        >
                            ส่งออกสินค้า
                        </Button>
                        {/* <Button 
                            onClick={handleCancel}
                            variant="contained" 
                            color="secondary" 
                            sx={{  color: 'white', '&:hover': { bgcolor: '#d32f2f' }, mt: 0 }}
                        >
                            ล้างข้อมูล
                        </Button> */}
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default ExProduct;
