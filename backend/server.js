const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const rooms = require('./rooms'); // ルーム管理モジュールの読み込み

const app = express();
const PORT = process.env.PORT || 4000;

// ミドルウェア
app.use(cors());
app.use(express.json());

// 簡単な起動確認用
app.get('/', (req, res) => {
  res.send('サーバーは動いています！');
});

// ルーム作成API
app.post('/api/create-room', (req, res) => {
  const roomCode = uuidv4().slice(0, 6).toUpperCase(); // 6桁のランダムコード
  rooms.createRoom(roomCode);
  res.json({ roomCode });
});

// ルーム参加API
app.post('/api/join-room', (req, res) => {
  const { roomCode, userName } = req.body;

  if (!roomCode || !userName) {
    return res.status(400).json({ error: 'Missing roomCode or userName' });
  }

  if (!rooms.exists(roomCode)) {
    return res.status(404).json({ error: 'Room not found' });
  }

  const userId = uuidv4();
  rooms.addUser(roomCode, { id: userId, name: userName });

  res.json({ userId, roomCode });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});