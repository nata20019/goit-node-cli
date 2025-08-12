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
      return console.table(contactsList);

    case "get":
      const contact = await contactsService.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const removedContact = await contactsService.removeContact(id);
      return console.log(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(options);
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "05olLMgyVQdWRwgKfg5J6" });
// invokeAction({
//   action: "add",
//   name: "Mango",
//   email: "mango@gmail.com",
//   phone: "322-22 - 22",
// });
// invokeAction({ action: "remove", id: "qdggE76Jtbfd9eWJHrssH" });
