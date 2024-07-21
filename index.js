import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


app.get('/test', async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM users');
        res.json(rows);
        console.log(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Database query failed');
    }
});


app.get('/check-connection', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        res.send('Database connected successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Database connection failed');
    }
});

app.post('/submit-referral',async(req,res)=>{
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    try {
        await pool.query(
            'INSERT INTO referrals (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );
        res.status(200).json({ message: 'Referral submitted successfully!' });
    } catch (error) {
        console.error('Error submitting referral:', error);
        res.status(500).json({ message: 'Error submitting referral' });
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
