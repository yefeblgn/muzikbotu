module.exports = {
  name: 'messageCreate', // Event ad�
  once: false, // E�er sadece bir kez �al��mas�n� istiyorsan�z true olarak ayarlayabilirsiniz
  execute(message) {
    // Event i�levi burada ger�ekle�tirilecektir
    console.log(`Yeni bir mesaj al�nd�: ${message.content}`);
  },
};
