export default class UserData {

    static myInstance = null;

    uuid = "";
    circleId = "";
    email = "";
    firstName = "";
    lastName = "";
    registered = "";
    softLogin = "";
    phoneNumber = "";

    constructor(){
        if(! UserData.myInstance){
          UserData.myInstance = this;
        }
        return UserData.myInstance;
    }

    static getInstance() {
        if (UserData.myInstance == null) {
            UserData.myInstance = new UserData();
        }

        return this.myInstance;
    }

    getUuid() {
        return this.uuid;
    }

    setUuid(id) {
        this.uuid = id;
    }

    getCircleId() {
        return this.circleId;
    }

    setCircleId(id) {
        this.circleId = id;
    }

    getEmail() {
        return this.email;
    }

    setEmail(id) {
        this.email = id;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(id) {
        this.firstName = id;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(id) {
        this.lastName = id;
    }

    getRegistered() {
        return this.registered;
    }

    setRegistered(id) {
        this.registered = id;
    }

    getSoftLogin() {
        return this.softLogin;
    }

    setSoftLogin(id) {
        this.softLogin = id;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    setPhoneNumber(id) {
        this.phoneNumber = id;
    }

}