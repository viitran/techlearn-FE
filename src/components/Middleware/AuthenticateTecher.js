export function checkRole({ store, next }) {
  const role = store.getters.getUserRole;
  // console.log(role);
  
  if (role && role === "gvT") {
    next();
  } else {
    console.log("you must login");
    next({ name: "StudentList" });
  }
}
