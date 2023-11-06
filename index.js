import * as contactService from "./contacts.js";
import { program } from "commander";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactService.listContacts();
      return console.table(contactsList);

    case "get":
      const contactSearchByID = await contactService.getContactById(id);
      return console.table(contactSearchByID);

    case "add":
      const newContact = await contactService.addContact(name, email, phone);
      return console.table(newContact);

    case "remove":
      const contactDelByID = await contactService.removeContact(id);
      return console.table(contactDelByID);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-ph, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);
