class ChatZone{
  constructor(connection){
      this.connection = connection;
      this.chatLog = [];
  }
  test(){
      console.log('test')
  }
  sendMessage(message){
      this.connection.send(message);
      this.chatLog.push({message:message,owner:"self"});
  }
  addMessage(message){
      this.chatLog.push({message:message,owner:"peer"});
  }
}
module.exports = ChatZone;