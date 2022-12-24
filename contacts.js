const fs = require("fs").promises;
const { program } = require("commander");
const path = require("node:path");
const { v1: uuidv1 } = require("uuid");
const contactsPath = path.resolve("./db/contacts.json");

async function getContacts() {
  const content = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(content);
  return contacts;
}

async function listContacts() {
  console.log(await getContacts());
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const isContactExist = contacts.find(
    (contact) => contact.id.toString() === contactId.toString()
  );
  if (isContactExist) {
    console.log(isContactExist);
    return isContactExist;
  } else {
    console.log("there is no contact with this id");
  }
}

async function removeContact(contactId) {
  if (await getContactById(contactId)) {
    const contacts = await getContacts();
    const RemovedContactIndex = contacts.findIndex(
      (contact) => contact.id.toString() === contactId.toString()
    );
    contacts.splice(RemovedContactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
  }
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const newContact = {
    id: uuidv1(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}

module.exports = { listContacts, getContactById, removeContact, addContact };
