const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();
const options = program.opts();

const { listContacts, getContactById, addContact, removeContact } = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case 'add':
      const newContacts = await addContact({ name, email, phone });
      console.table(newContacts);
      break;

    case 'remove':
      const deleteContact = await removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(options);
