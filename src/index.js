import { program } from "commander";
import * as contactsService from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactsService.listContacts();
      break;

    case "get":
      const contact = await contactsService.getContactById(id);
      break;

    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      break;

    case "remove":
      const removedContact = await contactsService.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
