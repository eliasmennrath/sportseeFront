export default class User {

    constructor(data) {
        this.id = data.data.id;
        this.firstName = data.data.userInfos.firstName;
        this.lastName = data.data.userInfos.lastName;
        this.age = data.data.userInfos.age;
        this.score = [{
            name: 'score',
            value: (data.data.todayScore || data.data.score) * 100,
        }];
        this.nutri = data.data.keyData;
    }

}