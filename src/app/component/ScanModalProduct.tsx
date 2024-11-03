import * as React from 'react';
import '../css/styles.css';
import { Modal, Typography, Box, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface ScanModalProductProps {
    open: boolean;
    onClose: () => void;
    productData: {
        name: string;
        id: string;
        price: number;
        stock: number;
    };
}

// สร้างธีม
const theme = createTheme({
    typography: {
        fontFamily: 'Anuphan, Arial, sans-serif',
    },
});

const ScanModalProduct: React.FC<ScanModalProductProps> = ({ open, onClose, productData = { name: '', id: '', price: 0, stock: 0 } }) => {
    const [inputValue, setInputValue] = React.useState<string>(''); 
    const [imageSrc, setImageSrc] = React.useState<string>('/image-icon/Lays.jpg'); 
    const [isCounting, setIsCounting] = React.useState<boolean>(false); 
    const [count1, setCount1] = React.useState<number | string>(''); 
    const [count2, setCount2] = React.useState<number | string>(''); 
    const [remark, setRemark] = React.useState<string>(''); 

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitted data:", { count1, count2, remark });
        // ส่งข้อมูลไปยัง backend ที่นี่
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
                            fontSize: { xs: '1.5rem', sm: '1.8rem' }
                        }}
                    >
                        ตรวจสอบสินค้า
                    </Typography>

                   

                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', backgroundColor: 'transparent' }}>
                        <Image 
                            src={imageSrc} 
                            alt="Product" 
                            width={200} 
                            height={200} 
                            style={{ 
                                borderRadius: '50%', 
                                width: '60%', 
                                maxWidth: { xs: 150, sm: 300 }, 
                                height: 'auto' 
                            }} 
                        />
                    </Box>

                    {/* แสดงข้อมูลสินค้า */}
                    <Typography sx={{ mt: 1, fontFamily: 'Anuphan', color: '#000', fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        ชื่อสินค้า: <span style={{ color: 'red', fontWeight: 'normal' }}>{productData?.name || 'Lays Original'}</span>
                    </Typography>
                    <Typography sx={{ mt: 1, fontFamily: 'Anuphan', color: '#000', fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        รหัสสินค้า: <span style={{ color: 'red', fontWeight: 'normal' }}>{productData?.id || 'LAY010001'}</span>
                    </Typography>
                    <Typography sx={{ mt: 1, fontFamily: 'Anuphan', color: '#000', fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        ราคา: <span style={{ color: 'red', fontWeight: 'normal' }}>{productData?.price || '20'}</span> บาท
                    </Typography>
                    <Typography sx={{ mt: 1, fontFamily: 'Anuphan', color: '#000', fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        จำนวนคลังคงเหลือ: <span style={{ color: 'red', fontWeight: 'normal' }}>{productData?.stock || '50'}</span> ชิ้น
                    </Typography>

                    <Button 
                        variant="contained" 
                        onClick={() => setIsCounting(!isCounting)} 
                        sx={{ 
                            mt: 2, 
                            fontFamily: 'Anuphan', 
                            display: 'flex', 
                            alignItems: 'center',
                            backgroundColor: '#F2B56B',
                            padding: '10px 20px',
                            fontSize: '1rem',
                            width: { xs: '80%', sm: '300px' }, // ปรับความกว้างให้เหมาะสมกับหน้าจอ
                            height: '40px', // กำหนดความสูงของปุ่ม
                            '&:hover': {
                                backgroundColor: '#D79F4C',
                            },
                        }} 
                    >
                        <CheckIcon sx={{ mr: 1 }} />
                        ตรวจนับ
                    </Button>

                    {isCounting && (
                        <Box 
                            component="form" 
                            onSubmit={handleSubmit} 
                            sx={{ 
                                mt: 5, 
                                mb: 5, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                width: '100%',
                                maxWidth: '400px', 
                                mx: 'auto', 
                                p: 2, 
                                bgcolor: 'background.paper', 
                                borderRadius: 1 
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TextField 
                                    label="ตรวจนับครั้งที่ 1" 
                                    variant="outlined" 
                                    fullWidth 
                                    value={count1} 
                                    onChange={(e) => setCount1(e.target.value)} 
                                    sx={{ 
                                        width: { xs: '70%', sm: '300px' }, 
                                        height: '50px',
                                        mr: 1 // ระยะห่างระหว่าง TextField และปุ่ม
                                    }} 
                                />
                                <Button 
                                    variant="contained" 
                                    onClick={() => handleIncrement(1)} 
                                    sx={{
                                        width: '50px', 
                                        height: '50px', 
                                        backgroundColor: '#4CAF50', 
                                        '&:hover': { backgroundColor: '#388E3C' },
                                        mx: 0.5 // ระยะห่างระหว่างปุ่ม + และ -
                                    }}
                                >
                                    <AddIcon />
                                </Button>
                                <Button 
                                    variant="contained" 
                                    onClick={() => handleDecrement(1)} 
                                    sx={{
                                        width: '50px', 
                                        height: '50px', 
                                        backgroundColor: '#F44336', 
                                        '&:hover': { backgroundColor: '#D32F2F' },
                                        mx: 0.5 // ระยะห่างระหว่างปุ่ม + และ -
                                    }}
                                >
                                    <RemoveIcon />
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TextField 
                                    label="ตรวจนับครั้งที่ 2" 
                                    variant="outlined" 
                                    fullWidth 
                                    value={count2} 
                                    onChange={(e) => setCount2(e.target.value)} 
                                    sx={{ 
                                        width: { xs: '70%', sm: '300px' }, 
                                        height: '50px',
                                        mr: 1 // ระยะห่างระหว่าง TextField และปุ่ม
                                    }} 
                                />
                                <Button 
                                    variant="contained" 
                                    onClick={() => handleIncrement(2)} 
                                    sx={{
                                        width: '50px', 
                                        height: '50px', 
                                        backgroundColor: '#4CAF50', 
                                        '&:hover': { backgroundColor: '#388E3C' },
                                        mx: 0.5 // ระยะห่างระหว่างปุ่ม + และ -
                                    }}
                                >
                                    <AddIcon />
                                </Button>
                                <Button 
                                    variant="contained" 
                                    onClick={() => handleDecrement(2)} 
                                    sx={{
                                        width: '50px', 
                                        height: '50px', 
                                        backgroundColor: '#F44336', 
                                        '&:hover': { backgroundColor: '#D32F2F' },
                                        mx: 0.5 // ระยะห่างระหว่างปุ่ม + และ -
                                    }}
                                >
                                    <RemoveIcon />
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TextField 
                                    label="หมายเหตุ" 
                                    variant="outlined" 
                                    fullWidth 
                                    value={remark} 
                                    onChange={(e) => setRemark(e.target.value)} 
                                    sx={{ 
                                        width: { xs: '264px', sm: '440px' }, // ความกว้าง 100% สำหรับมือถือ, 440px สำหรับขนาดใหญ่
                                        height: '50px',
                                        mr: 1
                                    }} 
                                />
                            </Box>


                               {/* ปรับตำแหน่งของปุ่มส่งผลและยกเลิกให้อยู่ทางขวา */}
                               <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 , mt: 3}}>
                                <Button 
                                    variant="contained" 
                                    type="submit" 
                                    sx={{ 
                                        backgroundColor: '#4CAF50', 
                                        '&:hover': { 
                                            backgroundColor: '#45a049' 
                                        },
                                        width: '120px', // กำหนดความกว้างของปุ่ม "ส่งผล"
                                    }}
                                >
                                    บันทึกผล
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    onClick={() => setIsCounting(false)} 
                                    sx={{ 
                                        ml: 2,
                                        width: '150px', // กำหนดความกว้างของปุ่ม "ยกเลิก"
                                    }}
                                >
                                    ล้าง
                                </Button>
                            </Box>

                      

                            
                        </Box>
                    )}
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default ScanModalProduct;
