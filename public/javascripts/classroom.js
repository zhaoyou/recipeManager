
ClassRoom = function() {
  init()
}

var init = function() {
  var chatElem = document.getElementById('chat');
  console.log(chatElem);
  if (!chatElem) {
    return;
  }

  socket = io.connect();
  socket.on('all client', function (data) {
    console.log(data);

    //socket.emit('my other event', { my: 'data' });
  });

  socket.on('message', function(data) {
    console.log('receive message', data);
  });

  socket.on('connect', function(data) {
    console.log('connect', data)
  });

  socket.on('error', function(data) {
    console.log('connect fail')
  });
}

var sendMessage = function(data) {
  socket.emit('send', data);
}
