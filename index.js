const options = require('./contacts')

const { Command } = require('commander');
const program = new Command();



async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const listContact = await options.listContacts();
      console.table(listContact)
    return listContact;

    case 'get':
      const contact = await options.getContactById(id);
      console.table(contact);
    return contact

    case 'add':
      const addContact = await options.addContact(name, email, phone);
      console.table(addContact);
    return addContact;

    case 'remove':
      const deletedContact = await options.removeContact(id);
      console.log(deletedContact);
      return deletedContact;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}



program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);