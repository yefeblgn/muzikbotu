module.exports = {
  name: 'messageCreate', // Event adý
  once: false, // Eðer sadece bir kez çalýþmasýný istiyorsanýz true olarak ayarlayabilirsiniz
  execute(message) {
    // Event iþlevi burada gerçekleþtirilecektir
    console.log(`Yeni bir mesaj alýndý: ${message.content}`);
  },
};
