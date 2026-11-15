const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
        <h1>Healthcare Management System</h1>
        <h2>DevSecOps Demo</h2>
        <p>Application is running securely.</p>
        <p>Patient records are simulated demo data only.</p>
    `);
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        application: 'Healthcare Management System'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Healthcare application running on port ${PORT}`);
});
