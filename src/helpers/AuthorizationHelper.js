import SessionHelper from "./SessionHelper";

let authorizationLookup = {};
const user = SessionHelper.getUser();

// const resp = Request("get", "/api/auth/get-authorization-list");
// resp.then((val) => {
//   console.log(val);
// })

authorizationLookup.dashboard = {
"ADMIN":                       {view: true, create: true, delete: true, edit: true},
"USER":                                {view: false, create: false, delete: false, edit: false},
}
authorizationLookup.myApps = {
"ADMIN":                       {view: false, create: false, delete: false, edit: false},
"USER":                                {view: true, create: true, delete: true, edit: true},
}
authorizationLookup.addApps = {
"ADMIN":                       {view: false, create: false, delete: false, edit: false},
"USER":                                {view: true, create: true, delete: true, edit: true},
}  
authorizationLookup.people = {
"ADMIN":                       {view: true, create: true, delete: true, edit: true},
"USER":                                {view: false, create: false, delete: false, edit: false},
}
authorizationLookup.apps = {
"ADMIN":                       {view: true, create: true, delete: true, edit: true},
"USER":                                {view: false, create: false, delete: false, edit: false},
}
    

export function getLookup() {
  return authorizationLookup;
}

export function getViewAuthorizationForAll(roles) {
  // authorizationLookup.resp = await Request("get", "/api/auth/get-authorization-list");
  // console.log(resp);
  // authorizationLookup.array = resp.data;
  // let authorization = {};
  // for(let i = 0; i < array.length; i++) {
  //   if(array[i]?.page === page) {
  //     authorizationLookup.authList = array[i]?.authorizationList;
  //     for(let j = 0; j < authList.length; j++) {
  //       if(authList[j] === "READ") {authorization.view = true}
  //       else if(authList[j] === "CREATE") {authorization.create = true}
  //       else if(authList[j] === "DELETE") {authorization.delete = true}
  //       else if(authList[j] === "GOALS") {authorization.goals = true}
  //       else if(authList[j] === "ASSIGN") {authorization.assign = true}
  //       else if(authList[j] === "EDIT") {authorization.edit = true}
  //       else if(authList[j] === "APPROVE") {authorization.approve = true}
  //       else if(authList[j] === "EXPORT") {authorization.export = true}
  //       else if(authList[j] === "EXPORT_ALL") {authorization.exportAll = true}
  //     }
  //   }
  // }

  let authorization = {};
  for (let i = 0; i < roles.length; i++) {
    for (let page in authorizationLookup) {
    //   if (page !== "dashboard") {
        authorization[page] = authorization[page]
          ? true
          : authorizationLookup[page][roles[i]].view;
    //   }
    }
  }
  return authorization;
}

export function getAuthorizationForPage(roles, page) {
  // const resp = await Request("get", "/api/auth/get-authorization-list");
  // console.log(resp);
  // const array = resp.data;
  // let authorization = {};

  // for(let i = 0; i < array.length; i++) {
  //   if(array[i]?.page === page) {
  //     const authList = array[i]?.authorizationList;
  //     for(let j = 0; j < authList.length; j++) {
  //       if(authList[j] === "READ") {authorization.view = true}
  //       else if(authList[j] === "CREATE") {authorization.create = true}
  //       else if(authList[j] === "DELETE") {authorization.delete = true}
  //       else if(authList[j] === "GOALS") {authorization.goals = true}
  //       else if(authList[j] === "ASSIGN") {authorization.assign = true}
  //       else if(authList[j] === "EDIT") {authorization.edit = true}
  //       else if(authList[j] === "APPROVE") {authorization.approve = true}
  //       else if(authList[j] === "EXPORT") {authorization.export = true}
  //       else if(authList[j] === "EXPORT_ALL") {authorization.exportAll = true}
  //     }
  //   }
  // }

  let authorization = {};
  for (let i = 0; i < roles.length; i++) {
    for (let prop in authorizationLookup[page][roles[i]]) {
      authorization[prop] = authorization[prop]
        ? true
        : authorizationLookup[page][roles[i]][prop];
    }
  }
  return authorization;
}