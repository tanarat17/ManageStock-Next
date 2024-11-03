// zpx\src\app\component\Report\Report.tsx
"use client";
import React from 'react';
import '../../css/styles.css';
import { Bar } from 'react-chartjs-2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Grid, Card, CardContent, Typography, Button , Box } from '@mui/material';
import Image from 'next/image';

// ลงทะเบียน scale และ element ที่ใช้
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report: React.FC = () => {
    // สร้างธีมของ Material-UI
    const theme = createTheme({
        typography: {
            fontFamily: 'Anuphan, Arial, sans-serif',
        },
    });

    // ข้อมูลสำหรับกราฟ
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'รับเข้า',
                backgroundColor: '#4CAF50', // สีกราฟของการรับเข้า
                data: [65, 59, 80, 81, 56, 55, 40], // ข้อมูลสำหรับกราฟ
            },
            {
                label: 'ส่งออก',
                backgroundColor: '#f44336', // สีกราฟของการส่งออก
                data: [28, 48, 40, 19, 86, 27, 90], // ข้อมูลสำหรับกราฟ
            },
        ],
    };

    // ตัวเลือกสำหรับกราฟ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'รายงานการรับเข้าส่งออก (ตามเดือน)',
            },
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // กำหนดความสูงเต็มหน้าจอเพื่อให้กราฟอยู่กึ่งกลาง
                    bgcolor: '#f0f0f0',
                }}
            >
                <Box 
                    sx={{ 
                        padding: 3, 
                        bgcolor: '#f9f9f9', 
                        borderRadius: 2, 
                        boxShadow: 2,
                        width: '100%',
                        maxWidth: '600px', 
                        height: '500px'
                    }}
                >
                    <Typography variant="h4" component="h2" sx={{ mb: 2, color: '#333', textAlign: 'center' }}>
                        รายงานการรับเข้าส่งออก
                    </Typography>
                    <Box sx={{ height: '100%', width: '100%' }}>
                        <Bar data={data} options={options} />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
    
};

export default Report;
