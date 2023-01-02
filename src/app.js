const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const commentRouter = require('./routes/comments');
const { default: mongoose } = require('mongoose');

dotenv.config();

mongoose.set('strictQuery', true);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('blog-uploads'));
app.use('/api/users', userRouter);
app.use('/api/articles', articleRouter);
app.use('/api/comments', commentRouter);

app.listen(PORT, () => {
	console.log('Running on port ' + PORT);
});

app.get('/', (req, res) => res.send('Tu real api manito.'));

// MongoDB Connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('Connected to DB'))
	.catch((err) => console.log(err));
