import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

function updateContats(contact) {
  const newContactsList = fs.writeFile(
    contactsPath,
    JSON.stringify(contact, null, 2)
  );
  return newContactsList;
}

export async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactSearchByID = contacts.find((e) => e.id === contactId);
  return contactSearchByID || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((e) => e.id === contactId);
  if (index === -1) {
    return null;
  }
  const [contactDelByID] = contacts.splice(index, 1);
  await updateContats(contacts);
  return contactDelByID;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContats(contacts);
  return newContact;
}
