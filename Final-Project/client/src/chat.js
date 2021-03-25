class ChatZone{
  constructor(connection){
      this.connection = connection;
      this.chatLog = [];
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