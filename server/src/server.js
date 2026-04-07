const express = require('express')
const cors = require('cors')

const authRoutes = require("./routers/auth.routers");


const app = express()

app.use(cors({
    allowedHeaders:[],
    origin: '*'
}))

app.use(express.json())

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});