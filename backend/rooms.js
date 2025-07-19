const rooms = {}; // メモリ上に部屋の状態を保存（サーバー再起動で消えます）

function createRoom(code) {
  rooms[code] = {
    users: [],
    prompt: null,
    answers: [],
    votes: {}
  };
}

function exists(code) {
  return rooms.hasOwnProperty(code);
}

function addUser(code, user) {
  if (exists(code)) {
    rooms[code].users.push(user);
  }
}

function getRoom(code) {
  return rooms[code] || null;
}

function getUsers(code) {
  return exists(code) ? rooms[code].users : [];
}

module.exports = {
  createRoom,
  exists,
  addUser,
  getRoom,
  getUsers,
};