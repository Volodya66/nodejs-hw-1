const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json")
const {nanoid} = require("nanoid");

async function listContacts () {
    const contactsList = await fs.readFile(contactsPath);
    return JSON.parse(contactsList);
}

async function getContactById(contactId) {
    const contactsList = await listContacts();

    const condition = !contactsList.some(contact => contact.id === contactId);
    const contact = contactsList.find(contact => contact.id === contactId);
    return condition ? null : contact;
}

async function removeContact(contactId) {
    const contactsList = await listContacts();

    const idxDelete = contactsList.findIndex(contact => contact.id === contactId);
    if (idxDelete === -1) {
    return null;  
    }
    const [deleteContact] = contactsList.splice(idxDelete, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return deleteContact;
}

async function addContact(name, email, phone) {
    const contactsList = await listContacts();

    if (!name || !email || !phone) {
        console.log("Please provide name, email, and phone for the new contact.");
        return null;
    }
    
    const newContact = {
        id: nanoid(),name,email,phone,
    };

    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return newContact;
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}