import React, { useState } from 'react';
import '../../css/styles.css';
import { Modal, Box, TextField, Button, Typography, MenuItem, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';

const ImProduct: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const theme = createTheme({
        typography: {
            fontFamily: 'Anuphan, Arial, sans-serif',
        },
    });

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('ชิ้น');
    const [remark, setRemark] = useState('');
    const [date, setDate] = useState('');

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

    const handleScan = () => {
        // ตัวอย่างการใช้การสแกน QR code
        const scanner = new QrReader({
            onScan: (data) => {
                if (data) {
                    setProductId(data);
                }
            },
            onError: (error) => {
                console.error("Error scanning:", error);
            },
        });

        scanner.start();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ productId, productName, price, quantity, unit, remark, date, imageSrc });
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setImageSrc(null);
        setProductId('');
        setProductName('');
        setPrice('');
        setQuantity('');
        setUnit('ชิ้น');
        setRemark('');
        setDate('');
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
                        '::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
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
                        รับเข้าสินค้า
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
                            transition: 'background-color 0.3s',
                            '&:hover': { bgcolor: '#e0f7e4' }
                        }}>
                            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Anuphan', color: '#333' }}>
                                ภาพสินค้า
                            </Typography>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload">
                                <Button
                                    variant="contained"
                                    component="span"
                                    sx={{
                                        bgcolor: '#f5b62f',
                                        color: 'white',
                                        '&:hover': { bgcolor: '#f5ab0c' },
                                        mr: 2,
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUpload} />
                                </Button>
                                <Button
                                    variant="contained"
                                    component="span"
                                    sx={{
                                        bgcolor: '#29c4c4',
                                        color: 'white',
                                        '&:hover': { bgcolor: '#0f9494' },
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCamera} />
                                </Button>
                            </label>

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

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
                            <TextField
                                label="รหัสสินค้า"
                                variant="outlined"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                onClick={handleScan}
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
                                label="ราคาต่อชิ้น"
                                variant="outlined"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                sx={{ flex: 1, mr: 1 }}
                            />
                            {/* ฟิลด์วันที่ */}
                            <TextField
                                label="วันที่"
                                type="date"
                                variant="outlined"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ flex: 1 }}
                            />
                        </Box>

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
                                select
                                label="หน่วย"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                variant="outlined"
                                sx={{ flex: 1 }}
                            >
                                {['ชิ้น', 'แพ็ค', 'ลัง'].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>

                        <TextField
                            label="หมายเหตุ"
                            variant="outlined"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            multiline
                            rows={2}
                            fullWidth
                        />

                        <Button 
                            type="submit"
                            variant="contained" 
                            color="primary" 
                            sx={{ bgcolor: '#4CAF50', color: 'white', '&:hover': { bgcolor: '#45a049' } }}
                        >
                            บันทึก
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

export default ImProduct;
