export default class Session {

    constructor(data) {
        this.sessions = data.data.sessions;

        this.sessions.forEach(session => {
            switch (session.day) {
                case 1:
                    session.day = "L";
                    break;

                case 2:
                    session.day = "M";
                    break;

                case 3: 
                    session.day = "M";
                    break;

                case 4:
                    session.day = "J";
                    break;

                case 5:
                    session.day = "V";
                    break;

                case 6:
                    session.day = "S";
                    break;

                case 7:
                    session.day = "D";
                    break;
            
                default:
                    break;
            }
        });

    }

}