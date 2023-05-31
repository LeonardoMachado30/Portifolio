export default function (plop) {
  // create your generators here
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.tsx",
      },
      {
        type: "add",
        path: "src/components/{{name}}/style.module.scss",
      },
      {
        type: "add",
        path: "src/components/{{name}}/ressourcePT.js",
      },
      {
        type: "add",
        path: "src/components/{{name}}/ressourceEN.js",
      },
    ],
  });
}
