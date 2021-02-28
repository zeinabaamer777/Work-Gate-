export enum Role {
      Admin = "1",
      SuperAdmin = "2",
      SuperVisor = "3",
      Worker = "4"
}

export const RoleMapping = [
      { value: Role.Admin, type: 'Admin' },
      { value: Role.SuperAdmin, type: 'SuperAdmin'},
      { value: Role.SuperVisor, type: 'SuperVisor'},
      { value: Role.Worker, type: 'Worker'}
];