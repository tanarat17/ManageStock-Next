"use client";
import * as React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Image from 'next/image';
import ScanModal from './ScanModal'; // นำเข้าคอมโพเนนต์ ScanModal
import ScanModalProduct from './ScanModalProduct'; // นำเข้าคอมโพเนนต์ ScanModalProduct
import '../css/styles.css'; // หรือเส้นทางที่ถูกต้องตามไฟล์

const VerticalCardGrid = () => {
    const [openScanModal, setOpenScanModal] = React.useState(false); // State สำหรับควบคุม modal สแกน
    const [openProductModal, setOpenProductModal] = React.useState(false); // State สำหรับควบคุม modal ของ ScanModalProduct

    const cardData = [
        { id: 1, title: "ตรวจนับ", image: "/image-icon/boxicon.png", onClick: () => setOpenScanModal(true) }, // เปิด modal สแกนเมื่อคลิก
        { id: 2, title: "รับเข้า - จ่ายออก", image: "/image-icon/Export.png", onClick: () => setOpenProductModal(true) }, // เปิด modal ของ ScanModalProduct เมื่อคลิก
        { id: 3, title: "รายงาน", image: "/image-icon/Report.png" }
    ];

    const handleCloseScanModal = () => {
        setOpenScanModal(false); // ปิด modal สแกน
    };

    const handleCloseProductModal = () => {
        setOpenProductModal(false); // ปิด modal ของ ScanModalProduct
    };
    
    return (
        <Grid container spacing={2} direction="column" sx={{ padding: 2 }}>
            {cardData.map(({ id, title, image, onClick }) => (
                <Grid item key={id} xs={12} sm={6} md={4}>
                    <Card 
                        sx={{ maxWidth: 600, height: '220px', backgroundColor: '#f5f5f5', borderRadius: 4, border: 'none' }} 
                        onClick={onClick} // เปิด modal ตามที่กำหนดเมื่อคลิก
                    >
                        <CardContent 
                            sx={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                border: '',
                            }}
                        >
                            <div style={{ height: '100px', width: '100px', overflow: 'hidden', borderRadius: '10%' }}>
                                <Image 
                                    src={image} 
                                    alt={title} 
                                    width={100} 
                                    height={100} 
                                    style={{ objectFit: 'cover' }} 
                                />
                            </div>
                            <Typography 
                                variant="h5" 
                                sx={{ marginTop: 1, fontWeight: 'bold' }}
                                className="chonburi-regular"
                            >
                                {title}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            {/* แสดง ScanModal ถ้า openScanModal เป็น true */}
            <ScanModal open={openScanModal} onClose={handleCloseScanModal} />

            {/* แสดง ScanModalProduct ถ้า openProductModal เป็น true */}
            <ScanModalProduct open={openProductModal} onClose={handleCloseProductModal} />
        </Grid>
    );
};

export default VerticalCardGrid;