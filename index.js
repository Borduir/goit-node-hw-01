const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// АЛЬТЕРНАТИВНИЙ ВАРІАНТ ДЛЯ СЕБЕ :)

// program.command("list").description("List all contacts").action(listContacts);

// program
//   .command("get <id>")
//   .description("Find contact by ID")
//   .action(getContactById);

// program
//   .command("add <name> <email> <phone>")
//   .description("Add new contact")
//   .action(addContact);

// program
//   .command("remove <id>")
//   .description("Remove contact")
//   .action(removeContact);
// program.parse(process.argv);
