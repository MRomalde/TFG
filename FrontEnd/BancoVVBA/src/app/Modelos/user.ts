export class User {
    userId!: number;
    surnameName: string;
    alias: string;
    login: string;
    password: string;
    dni: string;
    telephone: number;
    mail: string;
    typeAccessId: number;
    typeAccess: UsersTypeAccess;

    public constructor(
        surnameName: string,
        alias: string,
        login: string,
        password: string,
        dni: string,
        telephone: number,
        mail: string,
        typeAccessId: number
    ) {
        this.userId = 0;
        this.surnameName = surnameName;
        this.alias = alias;
        this.login = login;
        this.password = password;
        this.dni = dni;
        this.telephone = telephone;
        this.mail = mail;
        this.typeAccessId = typeAccessId;
        this.typeAccess = new UsersTypeAccess(typeAccessId, "User"); // Inicializa con datos por defecto
    }
}

export class UsersTypeAccess {
    typeAccessId: number;
    description: string;

    public constructor(typeAccessId: number = 0, description: string = "") {
        this.typeAccessId = typeAccessId;
        this.description = description;
    }
}
