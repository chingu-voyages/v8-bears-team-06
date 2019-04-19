import routes from "next-routes";

export default routes()
  .add("workCreate", "/work/create", "work/create")
  .add("workEdit", "/work/:id/edit", "work/edit")
  .add("work", "/work/:id");
